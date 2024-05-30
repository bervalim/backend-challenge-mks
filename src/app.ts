import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { handleErrors } from "./middlewares/handleError.middleware";
import { allRoutes } from "./router";

export const app: Application = express();

app.use(express.json());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use("/", allRoutes);

app.use(handleErrors);
