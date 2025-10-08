import { storage } from "./storage";
import type { GameRound } from "@shared/schema";

const BETTING_DURATION = 15000; // 15 seconds
const REVEALING_DURATION = 10000; // 10 seconds

export class GameManager {
  private checkInterval: NodeJS.Timeout | null = null;

  start() {
    console.log('[Game Manager] Starting continuous game loop...');
    this.checkInterval = setInterval(() => this.checkGameState(), 5000);
    this.checkGameState();
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private async checkGameState() {
    try {
      const activeRound = await storage.getActiveRound();
      const now = new Date();

      if (!activeRound) {
        console.log('[Game Manager] No active round found. Creating new betting phase (15s)');
        const bettingEndsAt = new Date(now.getTime() + BETTING_DURATION);
        
        await storage.createRound({
          status: 'betting',
          bettingEndsAt,
        });
        return;
      }

      if (activeRound.status === 'betting') {
        const bettingEndsAt = new Date(activeRound.bettingEndsAt);
        
        if (now >= bettingEndsAt) {
          console.log('[Game Manager] Betting phase ended. Starting reveal phase (10s)');
          
          const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          const dragonCard = cards[Math.floor(Math.random() * cards.length)];
          const tigerCard = cards[Math.floor(Math.random() * cards.length)];
          
          const cardValues: Record<string, number> = {
            'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
            '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
          };
          
          const dragonValue = cardValues[dragonCard];
          const tigerValue = cardValues[tigerCard];
          
          let winner = 'tie';
          if (dragonValue > tigerValue) winner = 'dragon';
          else if (tigerValue > dragonValue) winner = 'tiger';
          
          const revealingEndsAt = new Date(now.getTime() + REVEALING_DURATION);
          
          await storage.updateRound(activeRound.id, {
            status: 'revealing',
            dragonCard,
            tigerCard,
            winner,
            revealingEndsAt,
          });

          console.log(`[Game Manager] Round ${activeRound.id}: ${winner} wins! (Dragon: ${dragonCard}, Tiger: ${tigerCard})`);
        }
      }

      if (activeRound.status === 'revealing' && activeRound.revealingEndsAt) {
        const revealingEndsAt = new Date(activeRound.revealingEndsAt);
        
        if (now >= revealingEndsAt) {
          console.log('[Game Manager] Reveal phase ended. Completing round and starting next...');
          
          await storage.completeRound(activeRound.id);
          
          await this.calculatePayouts(activeRound.id, activeRound.winner || 'tie');
          
          const newBettingEndsAt = new Date(now.getTime() + BETTING_DURATION);
          await storage.createRound({
            status: 'betting',
            bettingEndsAt: newBettingEndsAt,
          });

          console.log(`[Game Manager] Round ${activeRound.id} completed. New round started immediately.`);
        }
      }
    } catch (error) {
      console.error('[Game Manager] Error:', error);
    }
  }

  private async calculatePayouts(roundId: string, winner: string) {
    const bets = await storage.getBetsByRound(roundId);
    
    for (const bet of bets) {
      let payoutAmount = 0;
      
      if (bet.betType === winner) {
        if (winner === 'tie') {
          payoutAmount = bet.amount * 8;
        } else {
          payoutAmount = bet.amount * 2;
        }
      }
      
      await storage.updateBetPayout(bet.id, payoutAmount);
      
      if (payoutAmount > 0) {
        const balance = await storage.getBalance(bet.sessionId);
        if (balance) {
          await storage.updateBalance(bet.sessionId, balance.balance + payoutAmount);
        }
      }
    }
  }
}

export const gameManager = new GameManager();
