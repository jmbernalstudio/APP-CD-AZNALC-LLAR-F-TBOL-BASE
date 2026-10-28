-- Borrar entrenadores (y sus accesos) desde la app: solo la junta, y nunca a uno mismo.
-- Sus peticiones se conservan (quedan sin autor); su asistencia marcada, avisos y convocatorias también.
alter table public.peticiones alter column autor drop not null;
alter table public.peticiones drop constraint if exists peticiones_autor_fkey;
alter table public.peticiones add constraint peticiones_autor_fkey foreign key (autor) references public.perfiles on delete set null;

create or replace function public.borrar_usuario(p_perfil uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.es_junta() then raise exception $m$Solo la junta puede borrar accesos$m$; end if;
  if p_perfil = auth.uid() then raise exception $m$No puedes borrarte a ti mismo$m$; end if;
  delete from auth.users where id = p_perfil;
end $$;

revoke all on function public.borrar_usuario(uuid) from public, anon;
grant execute on function public.borrar_usuario(uuid) to authenticated;
