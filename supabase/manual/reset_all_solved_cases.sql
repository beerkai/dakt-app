-- D.A.K.T. — TÜM analistlerin çözüm geçmişini sıfırla
-- Supabase Dashboard → SQL Editor (postgres / service role; RLS bypass)
--
-- UYARI: GERİ ALINAMAZ. Davalar kartlarındaki "çözüldü", profil, geçmiş,
-- başarılar ve yönetim istatistikleri bu tabloya dayanır.
--
-- Çalıştırmadan önce yedek isteğe bağlı:
--   Table Editor → solved_cases → Export

TRUNCATE public.solved_cases RESTART IDENTITY CASCADE;

-- TRUNCATE yetkin yoksa alternatif (aynı etki, id sırası resetlenmez):
-- DELETE FROM public.solved_cases;
