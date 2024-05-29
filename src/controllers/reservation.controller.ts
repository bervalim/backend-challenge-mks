import { Request, Response } from "express";
import {
  createReservationService,
  readAllReservationsByMovieService,
} from "../services/reservation.service";

export const createReservationController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sub } = res.locals.decodedToken;
  console.log("Decoded token sub:", sub);
  console.log("Request body:", req.body);
  await createReservationService(req.body, sub);
  return res.status(201).json({ message: "Reservation created" });
};

export const readAllReservationsByMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const reservationsByMovie = await readAllReservationsByMovieService(id);
  return res.status(200).json(reservationsByMovie);
};
