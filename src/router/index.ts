import { Router } from "express";
import { userRouter } from "./user.router.";
import { sessionRouter } from "./session.router";

export const allRoutes: Router = Router();

allRoutes.use("/user", userRouter);
allRoutes.use("/login", sessionRouter);
