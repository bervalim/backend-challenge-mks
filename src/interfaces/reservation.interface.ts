import { z } from "zod";
import {
  createReservationRequestSchema,
  readUserByMovieReservationSchema,
  reservationResponseSchema,
} from "../schemas/reservation.schema";
import { Repository } from "typeorm";
import Reservation from "../entities/Reservation.entity";

export type TReservationResponse = z.infer<typeof reservationResponseSchema>;
export type TCreateReservationRequest = z.infer<
  typeof createReservationRequestSchema
>;
export type TReadUserByMovieReservation = z.infer<
  typeof readUserByMovieReservationSchema
>;
export type TReservationRepo = Repository<Reservation>;
