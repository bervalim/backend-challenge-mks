import { Router } from "express";
import { userRouter } from "./user.router.";
import { sessionRouter } from "./session.router";
import { genreRouter } from "./genre.router";
import { movieRouter } from "./movie.router";
import { reservationRouter } from "./reservation.router";

export const allRoutes: Router = Router();

allRoutes.use("/user", userRouter);
allRoutes.use("/login", sessionRouter);
allRoutes.use("/genre", genreRouter);
allRoutes.use("/movie", movieRouter);
allRoutes.use("/reservation", reservationRouter);
