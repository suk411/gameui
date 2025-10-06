import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Continuous Game Manager Edge Function
 * 
 * DESIGN: Server-driven continuous betting game loop
 * - Each round: exactly 25 seconds (15s betting + 10s revealing)
 * - Runs continuously 24/7 via pg_cron (every 5 seconds)
 * - Independent of player activity - game never stops
 * - Players can join/leave anytime without affecting game flow
 * - Real-time sync for all connected clients via Supabase Realtime
 */

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('[Game Manager] Checking game state at:', new Date().toISOString());
    
    // Check for active round
    const { data: activeRound } = await supabaseClient
      .from('game_rounds')
      .select('*')
      .or('status.eq.betting,status.eq.revealing')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const now = new Date();

    if (!activeRound) {
      // No active round exists - start the continuous game loop
      console.log('[Game Manager] No active round found. Creating new betting phase (15s)');
      const bettingEndsAt = new Date(now.getTime() + 15000); // Exactly 15 seconds
      
      const { data: newRound, error } = await supabaseClient
        .from('game_rounds')
        .insert({
          status: 'betting',
          betting_ends_at: bettingEndsAt.toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('[Game Manager] Error creating round:', error);
        throw error;
      }

      console.log('[Game Manager] New round started:', newRound.id);
      return new Response(
        JSON.stringify({ 
          message: 'Continuous game loop initiated',
          roundId: newRound.id,
          phase: 'betting',
          endsAt: bettingEndsAt.toISOString()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if betting phase (15s) should end
    if (activeRound.status === 'betting') {
      const bettingEndsAt = new Date(activeRound.betting_ends_at);
      
      if (now >= bettingEndsAt) {
        // Transition to revealing phase (10s)
        console.log('[Game Manager] Betting phase ended. Starting reveal phase (10s)');
        
        // Generate random cards for this round
        const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const dragonCard = cards[Math.floor(Math.random() * cards.length)];
        const tigerCard = cards[Math.floor(Math.random() * cards.length)];
        
        // Determine winner
        const cardValues: Record<string, number> = {
          'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
          '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
        };
        
        const dragonValue = cardValues[dragonCard];
        const tigerValue = cardValues[tigerCard];
        
        let winner = 'tie';
        if (dragonValue > tigerValue) winner = 'dragon';
        else if (tigerValue > dragonValue) winner = 'tiger';
        
        const revealingEndsAt = new Date(now.getTime() + 10000); // Exactly 10 seconds
        
        const { error } = await supabaseClient
          .from('game_rounds')
          .update({
            status: 'revealing',
            dragon_card: dragonCard,
            tiger_card: tigerCard,
            winner: winner,
            revealing_ends_at: revealingEndsAt.toISOString(),
          })
          .eq('id', activeRound.id);

        if (error) {
          console.error('[Game Manager] Error updating to reveal phase:', error);
          throw error;
        }

        console.log(`[Game Manager] Round ${activeRound.id}: ${winner} wins! (Dragon: ${dragonCard}, Tiger: ${tigerCard})`);
        return new Response(
          JSON.stringify({ 
            message: 'Reveal phase started',
            roundId: activeRound.id,
            phase: 'revealing',
            winner,
            dragonCard,
            tigerCard,
            endsAt: revealingEndsAt.toISOString()
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check if revealing phase (10s) should end
    if (activeRound.status === 'revealing' && activeRound.revealing_ends_at) {
      const revealingEndsAt = new Date(activeRound.revealing_ends_at);
      
      if (now >= revealingEndsAt) {
        // Complete round, calculate payouts, and immediately start next round
        console.log('[Game Manager] Reveal phase ended. Completing round and starting next...');
        
        // Mark round as completed
        const { error: updateError } = await supabaseClient
          .from('game_rounds')
          .update({
            status: 'completed',
            completed_at: now.toISOString(),
          })
          .eq('id', activeRound.id);

        if (updateError) {
          console.error('[Game Manager] Error completing round:', updateError);
          throw updateError;
        }

        // Calculate payouts for all bets in this round
        const { error: payoutError } = await supabaseClient.rpc('calculate_payouts', { 
          round_uuid: activeRound.id 
        });

        if (payoutError) {
          console.error('[Game Manager] Error calculating payouts:', payoutError);
          // Continue anyway - don't break the game loop
        }

        // Immediately start new betting round (no gaps - continuous loop)
        const newBettingEndsAt = new Date(now.getTime() + 15000); // Next 15 seconds
        const { data: newRound, error: insertError } = await supabaseClient
          .from('game_rounds')
          .insert({
            status: 'betting',
            betting_ends_at: newBettingEndsAt.toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          console.error('[Game Manager] Error creating new round:', insertError);
          throw insertError;
        }

        console.log(`[Game Manager] Round ${activeRound.id} completed. New round ${newRound.id} started immediately.`);
        return new Response(
          JSON.stringify({ 
            message: 'Round cycle complete - continuous loop maintained',
            completedRoundId: activeRound.id,
            newRoundId: newRound.id,
            phase: 'betting',
            endsAt: newBettingEndsAt.toISOString(),
            totalRoundDuration: '25 seconds (15s betting + 10s revealing)'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Round is active but not ready for transition yet
    const timeRemaining = activeRound.status === 'betting' 
      ? Math.max(0, new Date(activeRound.betting_ends_at).getTime() - now.getTime())
      : Math.max(0, new Date(activeRound.revealing_ends_at || 0).getTime() - now.getTime());

    return new Response(
      JSON.stringify({ 
        message: 'Game running - no action needed',
        roundId: activeRound.id,
        phase: activeRound.status,
        timeRemaining: Math.ceil(timeRemaining / 1000) + 's',
        nextCheck: 'Server checks every 5 seconds'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
