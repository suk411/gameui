import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { GameRound, Bet, PlayerBalance } from "@shared/schema";

export function useGameManager() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let sid = localStorage.getItem("sessionId");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("sessionId", sid);
    }
    setSessionId(sid);
  }, []);

  const { data: currentRound } = useQuery<GameRound | null>({
    queryKey: ["/api/game/current"],
    enabled: true,
  });

  const { data: balance } = useQuery<PlayerBalance>({
    queryKey: ["/api/balance", sessionId],
    enabled: !!sessionId,
  });

  const { data: bets = [] } = useQuery<Bet[]>({
    queryKey: ["/api/bets", currentRound?.id],
    enabled: !!currentRound?.id,
  });

  const placeBetMutation = useMutation({
    mutationFn: async ({ betType, amount }: { betType: string; amount: number }) => {
      if (!currentRound || !sessionId) {
        throw new Error("Cannot place bet: No round or session");
      }

      if (currentRound.status !== "betting") {
        throw new Error("Cannot place bet: Betting phase is closed");
      }

      if (balance && balance.balance < amount) {
        throw new Error("Cannot place bet: Insufficient balance");
      }

      return apiRequest("/api/bets", {
        method: "POST",
        body: JSON.stringify({
          roundId: currentRound.id,
          sessionId,
          betType,
          amount,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/balance", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["/api/bets", currentRound?.id] });
    },
  });

  const placeBet = async (betType: string, amount: number): Promise<boolean> => {
    try {
      await placeBetMutation.mutateAsync({ betType, amount });
      return true;
    } catch (error) {
      console.error("Error placing bet:", error);
      return false;
    }
  };

  const getTotalBets = (betType: string) => {
    return bets
      .filter((bet) => bet.betType === betType)
      .reduce((sum, bet) => sum + bet.amount, 0);
  };

  return {
    currentRound,
    balance: balance?.balance || 0,
    sessionId,
    placeBet,
    getTotalBets,
    bets,
  };
}
