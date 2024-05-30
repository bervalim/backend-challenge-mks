import { Router } from "express";
import {
  createUserController,
  readAllUsersController,
  readOneUserController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/user.controller";
import {
  validateBody,
  verifyAdmin,
  verifyPermission,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  createUserRequestSchema,
  updateUserWithoutAdminSchema,
} from "../schemas/user.schema";
import {
  verifyUserEmailIsUnique,
  verifyUserIdExists,
} from "../middlewares/user.middleware";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(createUserRequestSchema),
  verifyUserEmailIsUnique,
  createUserController
);
userRouter.get("/", verifyToken, verifyAdmin, readAllUsersController);
userRouter.get(
  "/:id",
  verifyToken,
  verifyUserIdExists,
  verifyPermission,
  readOneUserController
);
userRouter.patch(
  "/:id",
  validateBody(updateUserWithoutAdminSchema),
  verifyToken,
  verifyUserIdExists,
  verifyPermission,
  verifyUserEmailIsUnique,
  updateUserController
);
userRouter.delete(
  "/:id",
  verifyToken,
  verifyUserIdExists,
  verifyPermission,
  softDeleteUserController
);
