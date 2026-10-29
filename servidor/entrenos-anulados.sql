-- Entrenos anulados: la junta quita, desde el Calendario, el entreno de un equipo un día concreto
-- (por ejemplo, porque esa semana hay partido). Lo ven todos; solo la junta puede anular o recuperar.
-- Solo añade una tabla nueva: no toca nada de lo que ya hay.
create table if not exists public.entrenos_anulados (
  equipo text not null references public.equipos on delete cascade,
  fecha  date not null,
  primary key (equipo, fecha)
);
alter table public.entrenos_anulados enable row level security;
drop policy if exists anulados_ver on public.entrenos_anulados;
create policy anulados_ver on public.entrenos_anulados for select to authenticated using (true);
drop policy if exists anulados_junta on public.entrenos_anulados;
create policy anulados_junta on public.entrenos_anulados for all to authenticated using (public.es_junta()) with check (public.es_junta());
