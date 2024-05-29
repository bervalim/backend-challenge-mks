import { Request, Response } from "express";
import {
  createMovieService,
  deleteMovieService,
  readMovieService,
  readMoviesService,
  updateMovieService,
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

export const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updatedMovie = await updateMovieService(id, req.body);
  return res.status(200).json(updatedMovie);
};

export const readMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const movie = await readMovieService(id);
  return res.status(200).json(movie);
};

export const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  await deleteMovieService(id);
  return res.status(204).json();
};
