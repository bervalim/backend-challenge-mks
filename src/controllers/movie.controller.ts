import { Request, Response } from "express";
import {
  createMovieService,
  readMoviesService,
} from "../services/movie.service";

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newMovie = await createMovieService(req.body);
  return res.status(201).json(newMovie);
};

export const readMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies = await readMoviesService();
  return res.status(200).json(movies);
};
