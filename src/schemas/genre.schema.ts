import { z } from "zod";

const GenreEnumValues = [
  "comedy",
  "drama",
  "action",
  "horror",
  "science_fiction",
] as const;

export const createGenreResponseSchema = z.object({
  id: z.string(),
  name: z.enum(GenreEnumValues),
});

export const createGenreRequestSchema = createGenreResponseSchema.omit({
  id: true,
});

export const readAllGenresSchema = createGenreResponseSchema.array();
