-- Estadísticas de cada jugador en los partidos de liga: minutos jugados y goles.
-- Las apunta el entrenador (o la junta) después de cada partido.
-- Solo añade una tabla nueva: no toca nada de lo que ya hay.
create table if not exists public.estadisticas (
  jugador  bigint references public.jugadores on delete cascade,
  fecha    date not null,
  minutos  int not null default 0,
  goles    int not null default 0,
  primary key (jugador, fecha)
);
alter table public.estadisticas enable row level security;
drop policy if exists est_mis_equipos on public.estadisticas;
create policy est_mis_equipos on public.estadisticas for all to authenticated
  using (public.es_junta() or public.entrena((select j.equipo from public.jugadores j where j.id = jugador)))
  with check (public.es_junta() or public.entrena((select j.equipo from public.jugadores j where j.id = jugador)));
