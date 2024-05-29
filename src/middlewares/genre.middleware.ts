import { NextFunction, Request, Response } from "express";
import Genre from "../entities/Genre.entity";
import { genreRepo } from "../repositories";
import AppError from "../errors/App.error";

export const verifyIfGenreExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const findGenre: Genre | null = await genreRepo.findOneBy({
    id: id,
  });

  if (!findGenre) throw new AppError("Genre not found!", 404);

  return next();
};
