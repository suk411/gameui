import { pgTable, uuid, text, bigserial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameRounds = pgTable("game_rounds", {
  id: uuid("id").primaryKey().defaultRandom(),
  roundNumber: bigserial("round_number", { mode: "number" }).notNull(),
  status: text("status").notNull().default("betting"),
  dragonCard: text("dragon_card"),
  tigerCard: text("tiger_card"),
  winner: text("winner"),
  bettingEndsAt: timestamp("betting_ends_at", { withTimezone: true }).notNull(),
  revealingEndsAt: timestamp("revealing_ends_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const bets = pgTable("bets", {
  id: uuid("id").primaryKey().defaultRandom(),
  roundId: uuid("round_id").notNull().references(() => gameRounds.id, { onDelete: "cascade" }),
  sessionId: text("session_id").notNull(),
  betType: text("bet_type").notNull(),
  amount: integer("amount").notNull(),
  payout: integer("payout").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const playerBalances = pgTable("player_balances", {
  sessionId: text("session_id").primaryKey(),
  balance: integer("balance").notNull().default(1000000),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const insertGameRoundSchema = createInsertSchema(gameRounds).omit({
  id: true,
  roundNumber: true,
  createdAt: true,
});

export const insertBetSchema = createInsertSchema(bets).omit({
  id: true,
  createdAt: true,
  payout: true,
});

export const insertPlayerBalanceSchema = createInsertSchema(playerBalances).omit({
  updatedAt: true,
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  createdAt: true,
});

export type GameRound = typeof gameRounds.$inferSelect;
export type InsertGameRound = z.infer<typeof insertGameRoundSchema>;

export type Bet = typeof bets.$inferSelect;
export type InsertBet = z.infer<typeof insertBetSchema>;

export type PlayerBalance = typeof playerBalances.$inferSelect;
export type InsertPlayerBalance = z.infer<typeof insertPlayerBalanceSchema>;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
