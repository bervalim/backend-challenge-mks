import { Request, Response } from "express";
import { TuserLoginResponse } from "../interfaces/user.interface";
import { userLoginService } from "../services/session.service";

export const clientLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TuserLoginResponse = await userLoginService(req.body);
  return res.status(200).json(token);
};
