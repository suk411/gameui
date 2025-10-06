import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // This function manages game rounds automatically
    // It should be called periodically (e.g., every 5 seconds)
    
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
      // No active round, create a new betting round
      console.log('Creating new betting round');
      const bettingEndsAt = new Date(now.getTime() + 15000); // 15 seconds from now
      
      await supabaseClient
        .from('game_rounds')
        .insert({
          status: 'betting',
          betting_ends_at: bettingEndsAt.toISOString(),
        });

      return new Response(
        JSON.stringify({ message: 'New betting round created' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if betting phase should end
    if (activeRound.status === 'betting') {
      const bettingEndsAt = new Date(activeRound.betting_ends_at);
      
      if (now >= bettingEndsAt) {
        // Transition to revealing phase
        console.log('Transitioning to revealing phase');
        
        // Generate random cards
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
        
        const revealingEndsAt = new Date(now.getTime() + 10000); // 10 seconds from now
        
        await supabaseClient
          .from('game_rounds')
          .update({
            status: 'revealing',
            dragon_card: dragonCard,
            tiger_card: tigerCard,
            winner: winner,
            revealing_ends_at: revealingEndsAt.toISOString(),
          })
          .eq('id', activeRound.id);

        return new Response(
          JSON.stringify({ 
            message: 'Revealing phase started',
            winner,
            dragonCard,
            tigerCard 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check if revealing phase should end
    if (activeRound.status === 'revealing' && activeRound.revealing_ends_at) {
      const revealingEndsAt = new Date(activeRound.revealing_ends_at);
      
      if (now >= revealingEndsAt) {
        // Complete round and calculate payouts
        console.log('Completing round and calculating payouts');
        
        await supabaseClient
          .from('game_rounds')
          .update({
            status: 'completed',
            completed_at: now.toISOString(),
          })
          .eq('id', activeRound.id);

        // Call the payout function
        await supabaseClient.rpc('calculate_payouts', { round_uuid: activeRound.id });

        // Create new betting round
        const newBettingEndsAt = new Date(now.getTime() + 15000);
        await supabaseClient
          .from('game_rounds')
          .insert({
            status: 'betting',
            betting_ends_at: newBettingEndsAt.toISOString(),
          });

        return new Response(
          JSON.stringify({ 
            message: 'Round completed, payouts calculated, new round started'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ message: 'No action needed', activeRound }),
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
