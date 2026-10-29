-- Duración de los partidos de cada equipo (la cambia la junta en Equipos > el equipo).
-- Solo añade dos columnas vacías: no toca nada de lo que ya hay.
alter table public.equipos add column if not exists partes int;
alter table public.equipos add column if not exists minutos_parte int;
