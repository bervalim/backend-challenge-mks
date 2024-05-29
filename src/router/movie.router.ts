import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  createMovieRequestSchema,
  updateMovieRequestSchema,
} from "../schemas/movie.schema";
import {
  createMovieController,
  deleteMovieController,
  readMovieController,
  readMoviesController,
  updateMovieController,
} from "../controllers/movie.controller";
import {
  verifyIfMovieReleaseYearIsInTheFuture,
  verifyMovieIdExists,
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

movieRouter.get("/:id", verifyToken, verifyMovieIdExists, readMovieController);

movieRouter.patch(
  "/:id",
  validateBody(updateMovieRequestSchema),
  verifyToken,
  verifyAdmin,
  verifyMovieIdExists,
  verifyMovieTitleIsUnique,
  verifyIfMovieReleaseYearIsInTheFuture,
  updateMovieController
);

movieRouter.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  verifyMovieIdExists,
  deleteMovieController
);
