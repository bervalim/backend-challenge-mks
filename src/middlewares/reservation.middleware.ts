import { NextFunction, Request, Response } from "express";
import Movie from "../entities/Movie.entity";
import { movieRepo, reservationRepo } from "../repositories";
import AppError from "../errors/App.error";
import Reservation from "../entities/Reservation.entity";

export const verifyMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { movieId } = req.body;

  const movie: Movie | null = await movieRepo.findOneBy({
    id: movieId,
  });

  if (!movie) throw new AppError("Movie not found for this reservation", 404);

  return next();
};

export const verifyMovieScheduleExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, movieId } = req.body;

  const reservation: Reservation | null = await reservationRepo.findOne({
    where: {
      movie: {
        id: movieId,
      },
      date: date,
      hour: hour,
    },
  });

  if (reservation)
    throw new AppError(
      "Reservation to this movie at this date and time already exists",
      409
    );

  return next();
};

export const verifyIfUserReservationForMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour } = req.body;

  let { sub } = res.locals.decodedToken;

  const reservation: Reservation | null = await reservationRepo.findOne({
    where: {
      user: sub,
      date,
      hour,
    },
  });

  if (reservation)
    throw new AppError(
      "User Reservation At this time and date already exists",
      409
    );

  return next();
};
