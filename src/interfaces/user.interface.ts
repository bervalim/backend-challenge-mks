import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import {
  createUserRequestSchema,
  createUserResponseSchema,
  createUserWithoutAdminSchema,
  userLoginRequestSchema,
} from "../schemas/user.schema";
import User from "../entities/User.entity";

export type TcreateUserRequest = z.infer<typeof createUserRequestSchema>;

export type TcreateUserWithoutAdminRequest = z.infer<
  typeof createUserWithoutAdminSchema
>;

export type TupdateUserRequest = DeepPartial<TcreateUserWithoutAdminRequest>;

export type TcreateUserResponse = z.infer<typeof createUserResponseSchema>;

export type TreadUserResponse = TcreateUserResponse[];

export type TuserLoginRequest = z.infer<typeof userLoginRequestSchema>;

export type TuserLoginResponse = { token: string };

export type TuserRepo = Repository<User>;
