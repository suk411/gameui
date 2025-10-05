-- Create game_rounds table to track each game round
CREATE TABLE public.game_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_number BIGSERIAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'betting', -- 'betting', 'revealing', 'completed'
  dragon_card TEXT,
  tiger_card TEXT,
  winner TEXT, -- 'dragon', 'tiger', 'tie'
  betting_ends_at TIMESTAMPTZ NOT NULL,
  revealing_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Create bets table to track all player bets
CREATE TABLE public.bets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id UUID NOT NULL REFERENCES public.game_rounds(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Anonymous session tracking
  bet_type TEXT NOT NULL, -- 'dragon', 'tiger', 'tie'
  amount INTEGER NOT NULL,
  payout INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create player_balances table to track player balances
CREATE TABLE public.player_balances (
  session_id TEXT PRIMARY KEY,
  balance INTEGER NOT NULL DEFAULT 1000000,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_balances ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow all users to read game data (public game)
CREATE POLICY "Anyone can view game rounds"
  ON public.game_rounds FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view bets"
  ON public.bets FOR SELECT
  USING (true);

CREATE POLICY "Players can view their own balance"
  ON public.player_balances FOR SELECT
  USING (true);

CREATE POLICY "Players can insert their own balance"
  ON public.player_balances FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Players can update their own balance"
  ON public.player_balances FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can insert bets"
  ON public.bets FOR INSERT
  WITH CHECK (true);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_rounds;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_balances;

-- Create indexes for better performance
CREATE INDEX idx_game_rounds_status ON public.game_rounds(status);
CREATE INDEX idx_bets_round_id ON public.bets(round_id);
CREATE INDEX idx_bets_session_id ON public.bets(session_id);

-- Function to calculate payouts
CREATE OR REPLACE FUNCTION public.calculate_payouts(round_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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