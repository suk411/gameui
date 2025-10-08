import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBetSchema } from "@shared/schema";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  app.get("/api/game/current", async (_req, res) => {
    try {
      const round = await storage.getActiveRound();
      res.json(round);
    } catch (error) {
      res.status(500).json({ error: "Failed to get current round" });
    }
  });

  app.post("/api/bets", async (req, res) => {
    try {
      const validatedBet = insertBetSchema.parse(req.body);
      
      const activeRound = await storage.getActiveRound();
      if (!activeRound || activeRound.status !== 'betting') {
        return res.status(400).json({ error: "No active betting round" });
      }

      if (validatedBet.roundId !== activeRound.id) {
        return res.status(400).json({ error: "Invalid round ID" });
      }

      const balance = await storage.getBalance(validatedBet.sessionId);
      if (!balance) {
        const newBalance = await storage.createBalance({
          sessionId: validatedBet.sessionId,
          balance: 1000000,
        });
        if (newBalance.balance < validatedBet.amount) {
          return res.status(400).json({ error: "Insufficient balance" });
        }
      } else if (balance.balance < validatedBet.amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      const deducted = await storage.deductBalance(validatedBet.sessionId, validatedBet.amount);
      if (!deducted) {
        return res.status(400).json({ error: "Failed to deduct balance" });
      }

      const bet = await storage.createBet(validatedBet);
      res.json(bet);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid bet data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create bet" });
    }
  });

  app.get("/api/balance/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      let balance = await storage.getBalance(sessionId);
      
      if (!balance) {
        balance = await storage.createBalance({
          sessionId,
          balance: 1000000,
        });
      }
      
      res.json(balance);
    } catch (error) {
      res.status(500).json({ error: "Failed to get balance" });
    }
  });

  app.get("/api/bets/:roundId", async (req, res) => {
    try {
      const { roundId } = req.params;
      const bets = await storage.getBetsByRound(roundId);
      res.json(bets);
    } catch (error) {
      res.status(500).json({ error: "Failed to get bets" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
