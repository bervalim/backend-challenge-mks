import {
  createGenreService,
  readAllGenresService,
  readAllMoviesByGenreService,
} from "../services/genre.service";
import { Request, Response } from "express";

export const createGenreController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newGenre = await createGenreService(req.body);
  return res.status(201).json(newGenre);
};

export const readAllGenresController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const genres = await readAllGenresService();
  return res.status(200).json(genres);
};

export const readAllMoviesByGenresController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const moviesByGenre = await readAllMoviesByGenreService(id);
  return res.status(200).json(moviesByGenre);
};
