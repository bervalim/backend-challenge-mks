import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  createGenreController,
  readAllGenresController,
  readAllMoviesByGenresController,
} from "../controllers/genre.controller";
import { createGenreRequestSchema } from "../schemas/genre.schema";
import { verifyIfGenreExists } from "../middlewares/genre.middleware";

export const genreRouter: Router = Router();
genreRouter.post(
  "/",
  validateBody(createGenreRequestSchema),
  verifyToken,
  verifyAdmin,
  createGenreController
);
genreRouter.get("/", verifyToken, readAllGenresController);
genreRouter.get(
  "/:id/movie",
  verifyIfGenreExists,
  verifyToken,
  readAllMoviesByGenresController
);
