-- Foto de cada jugador (opcional). Solo añade una columna: no toca nada de lo que ya hay.
-- La ven únicamente su entrenador y la junta, con la sesión iniciada (la misma regla que la plantilla).
alter table public.jugadores add column if not exists foto text;
