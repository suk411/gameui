import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * GameRoundManager - Client-side backup for continuous game loop
 * 
 * PRIMARY: Server-driven cron job runs every 5 seconds (pg_cron in database)
 * BACKUP: This component provides redundancy in case server scheduling has issues
 * 
 * The game loop is designed to run 24/7 on the server, independent of players.
 * Players can join/leave at any time - the game never stops.
 */
export default function GameRoundManager() {
  useEffect(() => {
    const manageRounds = async () => {
      try {
        await supabase.functions.invoke('game-manager');
      } catch (error) {
        console.error('Error managing game rounds:', error);
      }
    };

    // Call immediately on mount
    manageRounds();

    // Backup polling every 5 seconds (server cron is primary)
    const interval = setInterval(manageRounds, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
