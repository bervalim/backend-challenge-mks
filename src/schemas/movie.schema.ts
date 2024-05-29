import { z } from "zod";

export const createMovieResponseSchema = z.object({
  id: z.string(),
  title: z.string().max(255).min(3),
  description: z.string(),
  year: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  director: z.object({
    name: z.string().max(255).min(3),
    biograpy: z.string(),
    nationality: z.string().max(50).min(3),
  }),
  genreId: z.string(),
});

export const createMovieRequestSchema = createMovieResponseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
