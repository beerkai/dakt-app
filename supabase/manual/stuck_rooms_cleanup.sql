-- Berkay: Supabase Dashboard → SQL Editor (ÖNCE SELECT, sonra UPDATE)
-- Takılı kalan eski odaları arşivle + oyuncu satırlarını kapat.

-- 1) ÖNCE: Hangi odalar takılı kalmış bak
SELECT id, code, case_id, status, started_at, created_at
FROM public.rooms
WHERE status IN ('waiting', 'playing')
  AND (
    created_at < NOW() - INTERVAL '24 hours'
    OR (
      status = 'playing'
      AND id NOT IN (
        SELECT DISTINCT room_id
        FROM public.room_players
        WHERE left_at IS NULL
      )
    )
  );

-- 2) SONRA: Bunları arşivle (listeyi kontrol ettikten sonra)
UPDATE public.rooms
SET
  status = 'archived',
  archived_at = NOW(),
  finished_at = COALESCE(finished_at, NOW())
WHERE status IN ('waiting', 'playing')
  AND (
    created_at < NOW() - INTERVAL '24 hours'
    OR (
      status = 'playing'
      AND id NOT IN (
        SELECT DISTINCT room_id
        FROM public.room_players
        WHERE left_at IS NULL
      )
    )
  );

-- 3) Bu odalardaki left_at NULL olan oyuncuları da temizle
UPDATE public.room_players
SET left_at = NOW()
WHERE left_at IS NULL
  AND room_id IN (
    SELECT id FROM public.rooms
    WHERE status = 'archived'
      AND archived_at > NOW() - INTERVAL '5 minutes'
  );
