import { z } from "zod";
import {
  createReservationRequestSchema,
  reservationResponseSchema,
} from "../schemas/reservation.schema";
import { Repository } from "typeorm";
import Reservation from "../entities/Reservation.entity";

export type TReservationResponse = z.infer<typeof reservationResponseSchema>;
export type TCreateReservationRequest = z.infer<
  typeof createReservationRequestSchema
>;
export type TReservationRepo = Repository<Reservation>;
