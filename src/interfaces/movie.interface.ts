import { DeepPartial, Repository } from "typeorm";
import Movie from "../entities/Movie.entity";
import {
  createMovieRequestSchema,
  createMovieResponseSchema,
} from "../schemas/movie.schema";
import { z } from "zod";
import Director from "../entities/Director.entity";

export type TcreateMovieResponse = z.infer<typeof createMovieResponseSchema>;
export type TcreateMovieRequest = z.infer<typeof createMovieRequestSchema>;
export type TUpdateMovieRequest = DeepPartial<TcreateMovieRequest>;
export type TMovieRepo = Repository<Movie>;
export type TDirectorRepo = Repository<Director>;
