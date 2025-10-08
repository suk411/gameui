import type { GameRound, InsertGameRound, Bet, InsertBet, PlayerBalance, InsertPlayerBalance } from "@shared/schema";

export interface IStorage {
  getActiveRound(): Promise<GameRound | null>;
  createRound(round: InsertGameRound): Promise<GameRound>;
  updateRound(id: string, updates: Partial<GameRound>): Promise<GameRound | null>;
  completeRound(id: string): Promise<void>;
  
  createBet(bet: InsertBet): Promise<Bet>;
  getBetsByRound(roundId: string): Promise<Bet[]>;
  updateBetPayout(betId: string, payout: number): Promise<void>;
  
  getBalance(sessionId: string): Promise<PlayerBalance | null>;
  createBalance(balance: InsertPlayerBalance): Promise<PlayerBalance>;
  updateBalance(sessionId: string, amount: number): Promise<void>;
  deductBalance(sessionId: string, amount: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private rounds: Map<string, GameRound> = new Map();
  private bets: Map<string, Bet> = new Map();
  private balances: Map<string, PlayerBalance> = new Map();
  private roundCounter = 1;

  async getActiveRound(): Promise<GameRound | null> {
    const activeRounds = Array.from(this.rounds.values()).filter(
      r => r.status === 'betting' || r.status === 'revealing'
    );
    return activeRounds.length > 0 ? activeRounds[0] : null;
  }

  async createRound(round: InsertGameRound): Promise<GameRound> {
    const id = crypto.randomUUID();
    const newRound: GameRound = {
      id,
      roundNumber: this.roundCounter++,
      createdAt: new Date(),
      completedAt: null,
      dragonCard: null,
      tigerCard: null,
      winner: null,
      revealingEndsAt: null,
      ...round,
    };
    this.rounds.set(id, newRound);
    return newRound;
  }

  async updateRound(id: string, updates: Partial<GameRound>): Promise<GameRound | null> {
    const round = this.rounds.get(id);
    if (!round) return null;
    const updated = { ...round, ...updates };
    this.rounds.set(id, updated);
    return updated;
  }

  async completeRound(id: string): Promise<void> {
    const round = this.rounds.get(id);
    if (round) {
      round.status = 'completed';
      round.completedAt = new Date();
    }
  }

  async createBet(bet: InsertBet): Promise<Bet> {
    const id = crypto.randomUUID();
    const newBet: Bet = {
      id,
      createdAt: new Date(),
      payout: 0,
      ...bet,
    };
    this.bets.set(id, newBet);
    return newBet;
  }

  async getBetsByRound(roundId: string): Promise<Bet[]> {
    return Array.from(this.bets.values()).filter(b => b.roundId === roundId);
  }

  async updateBetPayout(betId: string, payout: number): Promise<void> {
    const bet = this.bets.get(betId);
    if (bet) {
      bet.payout = payout;
    }
  }

  async getBalance(sessionId: string): Promise<PlayerBalance | null> {
    return this.balances.get(sessionId) || null;
  }

  async createBalance(balance: InsertPlayerBalance): Promise<PlayerBalance> {
    const newBalance: PlayerBalance = {
      updatedAt: new Date(),
      balance: balance.balance || 1000000,
      ...balance,
    };
    this.balances.set(balance.sessionId, newBalance);
    return newBalance;
  }

  async updateBalance(sessionId: string, amount: number): Promise<void> {
    const balance = this.balances.get(sessionId);
    if (balance) {
      balance.balance = amount;
      balance.updatedAt = new Date();
    }
  }

  async deductBalance(sessionId: string, amount: number): Promise<boolean> {
    const balance = this.balances.get(sessionId);
    if (!balance || balance.balance < amount) {
      return false;
    }
    balance.balance -= amount;
    balance.updatedAt = new Date();
    return true;
  }
}

export const storage = new MemStorage();
