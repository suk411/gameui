-- Fix function search path issue
DROP FUNCTION IF EXISTS public.calculate_payouts(UUID);

CREATE OR REPLACE FUNCTION public.calculate_payouts(round_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  round_winner TEXT;
  bet_record RECORD;
  payout_amount INTEGER;
BEGIN
  -- Get the winner
  SELECT winner INTO round_winner FROM public.game_rounds WHERE id = round_uuid;
  
  -- Process each bet for this round
  FOR bet_record IN 
    SELECT * FROM public.bets WHERE round_id = round_uuid
  LOOP
    payout_amount := 0;
    
    -- Calculate payout based on bet type and winner
    IF bet_record.bet_type = round_winner THEN
      IF round_winner = 'tie' THEN
        payout_amount := bet_record.amount * 8; -- 8x for tie
      ELSE
        payout_amount := bet_record.amount * 2; -- 2x for dragon/tiger
      END IF;
    END IF;
    
    -- Update bet with payout
    UPDATE public.bets SET payout = payout_amount WHERE id = bet_record.id;
    
    -- Update player balance
    IF payout_amount > 0 THEN
      UPDATE public.player_balances 
      SET balance = balance + payout_amount, updated_at = now()
      WHERE session_id = bet_record.session_id;
    END IF;
  END LOOP;
END;
$$;