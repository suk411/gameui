import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GameRound {
  id: string;
  status: 'betting' | 'revealing' | 'completed';
  dragon_card: string | null;
  tiger_card: string | null;
  winner: string | null;
  betting_ends_at: string;
}

export interface Bet {
  id: string;
  round_id: string;
  session_id: string;
  bet_type: string;
  amount: number;
  payout: number;
}

export function useGameManager() {
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [balance, setBalance] = useState(951888);
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize or get session ID
  useEffect(() => {
    let sid = localStorage.getItem("dragon_tiger_session");
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("dragon_tiger_session", sid);
    }
    setSessionId(sid);

    // Initialize player balance
    const initBalance = async () => {
      const { data } = await supabase
        .from("player_balances")
        .select("balance")
        .eq("session_id", sid)
        .single();

      if (data) {
        setBalance(data.balance);
      } else {
        // Create new balance record
        await supabase.from("player_balances").insert({
          session_id: sid,
          balance: 951888,
        });
      }
    };

    if (sid) initBalance();
  }, []);

  // Subscribe to balance updates
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel("player_balance_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "player_balances",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload: any) => {
          if (payload.new) {
            setBalance(payload.new.balance);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // Subscribe to current round updates
  useEffect(() => {
    const fetchCurrentRound = async () => {
      const { data } = await supabase
        .from("game_rounds")
        .select("*")
        .or('status.eq.betting,status.eq.revealing')
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setCurrentRound(data as GameRound);
      }
    };

    fetchCurrentRound();

    const channel = supabase
      .channel("game_rounds_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_rounds",
        },
        () => {
          fetchCurrentRound();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Subscribe to bets for current round
  useEffect(() => {
    if (!currentRound) return;

    const fetchBets = async () => {
      const { data } = await supabase
        .from("bets")
        .select("*")
        .eq("round_id", currentRound.id);

      if (data) {
        setBets(data as Bet[]);
      }
    };

    fetchBets();

    const channel = supabase
      .channel(`bets_${currentRound.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bets",
          filter: `round_id=eq.${currentRound.id}`,
        },
        () => {
          fetchBets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentRound?.id]);

  const placeBet = async (betType: string, amount: number) => {
    if (!currentRound || !sessionId) return false;

    // Check if betting is still allowed
    if (currentRound.status !== 'betting') return false;

    // Check if user has enough balance
    if (balance < amount) return false;

    // Deduct from balance first
    const { error: balanceError } = await supabase
      .from("player_balances")
      .update({ balance: balance - amount })
      .eq("session_id", sessionId);

    if (balanceError) return false;

    // Place bet
    const { error: betError } = await supabase.from("bets").insert({
      round_id: currentRound.id,
      session_id: sessionId,
      bet_type: betType,
      amount: amount,
    });

    return !betError;
  };

  // Calculate total bets per type
  const getTotalBets = (betType: string) => {
    return bets
      .filter((bet) => bet.bet_type === betType)
      .reduce((sum, bet) => sum + bet.amount, 0);
  };

  return {
    currentRound,
    balance,
    sessionId,
    placeBet,
    getTotalBets,
    bets,
  };
}
