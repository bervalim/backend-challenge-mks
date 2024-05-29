import { Router } from "express";
import { validateBody } from "../middlewares/globals.middleware";
import { userLoginRequestSchema } from "../schemas/user.schema";
import { userLoginController } from "../controllers/session.controller";

export const sessionRouter: Router = Router();
sessionRouter.post(
  "/",
  validateBody(userLoginRequestSchema),
  userLoginController
);
