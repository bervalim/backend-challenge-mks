import { Request, Response } from "express";
import {
  TcreateUserResponse,
  TreadUserResponse,
} from "../interfaces/user.interface";
import {
  createUserService,
  readAllUsersService,
  softDeleteUserService,
  updateUserService,
} from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser: TcreateUserResponse = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TreadUserResponse = await readAllUsersService();
  return res.status(200).json(users);
};

export const readOneUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUser } = res.locals;
  delete findUser.password;
  return res.status(200).json(findUser);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUser } = res.locals;
  const updatedUser = await updateUserService(req.body, findUser);
  return res.status(200).json(updatedUser);
};

export const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUser } = res.locals;
  await softDeleteUserService(findUser);
  return res.status(204).json();
};
