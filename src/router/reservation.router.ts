import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import { createReservationRequestSchema } from "../schemas/reservation.schema";
import {
  verifyIfUserReservationForMovieExists,
  verifyMovieExists,
  verifyMovieScheduleExists,
} from "../middlewares/reservation.middleware";
import {
  createReservationController,
  readAllReservationsByMovieController,
} from "../controllers/reservation.controller";

export const reservationRouter: Router = Router();
reservationRouter.post(
  "/",
  validateBody(createReservationRequestSchema),
  verifyToken,
  verifyMovieExists,
  verifyMovieScheduleExists,
  verifyIfUserReservationForMovieExists,
  createReservationController
);
reservationRouter.get(
  "/movie/:id",
  verifyToken,
  verifyAdmin,
  readAllReservationsByMovieController
);
