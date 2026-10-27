-- Notificaciones al móvil. Pegar entero en el SQL Editor de Supabase (proyecto del club).
create extension if not exists pg_net with schema extensions;

create table if not exists public.push_subs (
  endpoint text primary key,
  perfil   uuid not null references public.perfiles on delete cascade,
  p256dh   text not null,
  auth     text not null,
  creada   timestamptz not null default now()
);
alter table public.push_subs enable row level security;
drop policy if exists push_mias on public.push_subs;
create policy push_mias on public.push_subs for all to authenticated using (perfil = auth.uid()) with check (perfil = auth.uid());

-- Claves de las notificaciones: sin políticas, solo las lee la función del servidor
create table if not exists public.push_config (id int primary key, publica text not null, privada text not null);
alter table public.push_config enable row level security;

create or replace function public.avisar_push() returns trigger language plpgsql security definer set search_path = public, extensions as $$
begin
  perform net.http_post(
    url := $u$https://wkqifwtmbcutlqkonivv.supabase.co/functions/v1/avisar$u$,
    body := jsonb_build_object($k$tabla$k$, TG_TABLE_NAME, $k$op$k$, TG_OP, $k$id$k$, new.id),
    headers := jsonb_build_object($k$Content-Type$k$, $k$application/json$k$));
  return new;
end $$;

drop trigger if exists push_aviso on public.avisos;
create trigger push_aviso after insert on public.avisos for each row execute function public.avisar_push();
drop trigger if exists push_peticion on public.peticiones;
create trigger push_peticion after insert on public.peticiones for each row execute function public.avisar_push();
drop trigger if exists push_estado on public.peticiones;
create trigger push_estado after update of estado on public.peticiones for each row when (old.estado is distinct from new.estado) execute function public.avisar_push();
