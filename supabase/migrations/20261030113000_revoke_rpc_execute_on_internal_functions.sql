-- Internal SECURITY DEFINER functions must not be callable through the REST API.
-- Trigger / event-trigger functions still fire (EXECUTE is not checked for triggers).
-- update_last_seen() stays callable by signed-in users (AuthProvider calls it).
-- Applied to prod on 2026-10-30 as migration `revoke_rpc_execute_on_internal_functions`.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
revoke execute on function public.update_last_seen() from public, anon;
grant execute on function public.update_last_seen() to authenticated;
