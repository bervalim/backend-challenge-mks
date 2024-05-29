import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import AppError from "../errors/App.error";
import { verify } from "jsonwebtoken";

export const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];

  const decodedToken = verify(token, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decodedToken };

  return next();
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decodedToken;

  if (!admin) throw new AppError("Insuficcient Permissions", 403);

  return next();
};

export const verifyPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  const { admin, sub } = res.locals.decodedToken;

  if (admin) return next();

  if (sub !== id) throw new AppError("Insuficcient Permissions", 403);

  return next();
};
