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

export const readUserByMovieReservationSchema = z.object({
  id: z.string(),
  date: z.string(),
  hour: z.string(),
  reservationCode: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string().max(255).min(3),
    email: z.string().email().max(255).min(3),
    password: z.string().max(255).min(3),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  }),
});

export const readReservationByMovieResponseSchema = z.object({
  id: z.string(),
  title: z.string().max(255).min(3),
  description: z.string(),
  year: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  reservations: z.object({
    date: z.string(),
    hour: z.string(),
    reservationCode: z.string(),
    user: z.object({
      id: z.string(),
      name: z.string().max(255).min(3),
      email: z.string().email().max(255).min(3),
      admin: z.boolean().default(false),
      createdAt: z.string(),
      updatedAt: z.string(),
      deletedAt: z.string().nullable(),
    }),
  }),
  director: z.object({
    name: z.string().max(255).min(3),
    biograpy: z.string(),
    nationality: z.string().max(50).min(3),
  }),
  genreId: z.string(),
});
