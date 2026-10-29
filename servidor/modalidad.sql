-- Fútbol 7 o fútbol 11 de cada equipo (la cambia la junta en Equipos > el equipo).
-- Solo añade una columna vacía: no toca nada de lo que ya hay.
alter table public.equipos add column if not exists modalidad int;
