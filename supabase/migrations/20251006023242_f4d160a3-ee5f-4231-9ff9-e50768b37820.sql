-- Enable required extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job to call the game-manager edge function every 5 seconds
-- This ensures the game loop runs continuously on the server, independent of players
SELECT cron.schedule(
  'continuous-game-loop',
  '*/5 * * * * *', -- Every 5 seconds (using seconds in cron syntax)
  $$
  SELECT
    net.http_post(
        url:='https://msligujdtxycmitidaja.supabase.co/functions/v1/game-manager',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zbGlndWpkdHh5Y21pdGlkYWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDg4ODIsImV4cCI6MjA3NTE4NDg4Mn0.hq9eBuaWeTGBdfwa-4UZlp0pjOiZYAP1I6IF4Xcpfhk"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;