import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/handleError.middleware";
import { allRoutes } from "./router";

export const app: Application = express();

app.use(express.json());

app.use("/", allRoutes);

app.use(handleErrors);
