import { z } from "zod";

export const reservationResponseSchema = z.object({
  id: z.string(),
  date: z.string(),
  hour: z.string(),
  reservationCode: z.string(),
  userId: z.string(),
  movieId: z.string(),
});

export const createReservationRequestSchema = reservationResponseSchema.omit({
  id: true,
  reservationCode: true,
  userId: true,
});
