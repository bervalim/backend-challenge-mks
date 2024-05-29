import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import { createMovieRequestSchema } from "../schemas/movie.schema";
import {
  createMovieController,
  readMoviesController,
} from "../controllers/movie.controller";
import {
  verifyIfMovieReleaseYearIsInTheFuture,
  verifyMovieTitleIsUnique,
} from "../middlewares/movie.middleware";

export const movieRouter: Router = Router();

movieRouter.post(
  "/",
  validateBody(createMovieRequestSchema),
  verifyToken,
  verifyAdmin,
  verifyMovieTitleIsUnique,
  verifyIfMovieReleaseYearIsInTheFuture,
  createMovieController
);
movieRouter.get("/", verifyToken, readMoviesController);
