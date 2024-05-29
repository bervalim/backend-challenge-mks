import { NextFunction, Request, Response } from "express";
import Movie from "../entities/Movie.entity";
import { movieRepo } from "../repositories";
import AppError from "../errors/App.error";

export const verifyMovieTitleIsUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title } = req.body;

  const findMovieTitle: Movie | null = await movieRepo.findOneBy({
    title,
  });

  if (findMovieTitle)
    throw new AppError("This movie has already been registred", 409);

  return next();
};

export const verifyIfMovieReleaseYearIsInTheFuture = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { year } = req.body;

  const currentYear = new Date().getFullYear();

  if (year > currentYear) {
    throw new AppError("The movie release cannot be in the future", 400);
  }

  return next();
};

export const verifyMovieIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const findMovie: Movie | null = await movieRepo.findOneBy({
    id: id,
  });

  if (!findMovie) throw new AppError("Movie not found!", 404);

  return next();
};
