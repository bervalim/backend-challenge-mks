import { z } from "zod";
import { Repository } from "typeorm";
import Genre from "../entities/Genre.entity";
import {
  createGenreRequestSchema,
  createGenreResponseSchema,
  readAllGenresSchema,
} from "../schemas/genre.schema";

export type TGenreResponse = z.infer<typeof createGenreResponseSchema>;
export type TCreateGenreRequest = z.infer<typeof createGenreRequestSchema>;
export type TreadAllGenres = z.infer<typeof readAllGenresSchema>;
export type TGenreRepo = Repository<Genre>;
