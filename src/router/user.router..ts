import { Router } from "express";
import {
  createUserController,
  readAllUsersController,
} from "../controllers/user.controller";
import { validateBody } from "../middlewares/globals.middleware";
import { createUserRequestSchema } from "../schemas/user.schema";
import { verifyUserEmailIsUnique } from "../middlewares/user.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(createUserRequestSchema),
  verifyUserEmailIsUnique,
  createUserController
);

userRouter.get("/", readAllUsersController);
