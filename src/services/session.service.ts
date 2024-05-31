import "dotenv/config";
import { compare } from "bcryptjs";
import AppError from "../errors/App.error";
import { sign } from "jsonwebtoken";
import {
  TuserLoginRequest,
  TuserLoginResponse,
} from "../interfaces/user.interface";
import User from "../entities/User.entity";
import { userRepo } from "../repositories";
// import { getRedis, setRedis } from "../redisConfig";

export const userLoginService = async (
  requestBody: TuserLoginRequest
): Promise<TuserLoginResponse> => {
  const { email } = requestBody;

  const { password } = requestBody;

  const findUser: User | null = await userRepo.findOneBy({
    email: email,
  });
  // const userRedis = await getRedis(`user-${findUser?.id}`);
  // const user = JSON.parse(userRedis as any);

  if (!findUser) throw new AppError("Invalid credentials", 401);

  const comparePasswords = await compare(password, findUser.password);

  if (!comparePasswords) throw new AppError("Invalid credentials", 401);

  const token = sign(
    { email: findUser.email, admin: findUser.admin },
    process.env.SECRET_KEY!,
    { subject: findUser.id, expiresIn: process.env.EXPIRES_IN! }
  );

  // await setRedis(`user-${user.id}`, JSON.stringify(user));

  return { token };
};
