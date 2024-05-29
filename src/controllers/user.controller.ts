import { Request, Response } from "express";
import {
  TcreateUserResponse,
  TreadUserResponse,
} from "../interfaces/user.interface";
import {
  createUserService,
  readAllUsersService,
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
