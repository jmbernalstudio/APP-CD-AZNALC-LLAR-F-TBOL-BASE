-- Directo de los partidos: titulares, suplentes, goles, tarjetas y cambios con su minuto.
-- Lo apunta el entrenador durante el partido; al acabar, los minutos y goles pasan a "estadisticas".
-- Solo añade una tabla nueva: no toca nada de lo que ya hay.
create table if not exists public.partidos_directo (
  equipo      text references public.equipos on delete cascade,
  fecha       date not null,
  datos       jsonb not null,
  actualizado timestamptz not null default now(),
  primary key (equipo, fecha)
);
alter table public.partidos_directo enable row level security;
drop policy if exists directo_mis_equipos on public.partidos_directo;
create policy directo_mis_equipos on public.partidos_directo for all to authenticated
  using (public.es_junta() or public.entrena(equipo)) with check (public.es_junta() or public.entrena(equipo));
