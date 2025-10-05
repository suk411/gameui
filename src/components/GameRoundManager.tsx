import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// This component calls the game-manager edge function periodically
export default function GameRoundManager() {
  useEffect(() => {
    const manageRounds = async () => {
      try {
        await supabase.functions.invoke('game-manager');
      } catch (error) {
        console.error('Error managing game rounds:', error);
      }
    };

    // Call immediately
    manageRounds();

    // Then call every 5 seconds
    const interval = setInterval(manageRounds, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
