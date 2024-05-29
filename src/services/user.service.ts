import User from "../entities/User.entity";
import {
  TcreateUserRequest,
  TcreateUserResponse,
  TreadUserResponse,
  TupdateUserRequest,
} from "../interfaces/user.interface";
import { userRepo } from "../repositories";
import {
  createUserResponseSchema,
  usersListResponseSchema,
} from "../schemas/user.schema";

export const createUserService = async (
  requestBody: TcreateUserRequest
): Promise<TcreateUserResponse> => {
  const newUser: User = userRepo.create(requestBody);

  await userRepo.save(newUser);

  return createUserResponseSchema.parse(newUser);
};

export const readAllUsersService = async (): Promise<TreadUserResponse> => {
  const users: User[] = await userRepo.find();
  return usersListResponseSchema.parse(users);
};

export const updateUserService = async (
  requestBody: TupdateUserRequest,
  user: User
): Promise<TcreateUserResponse> => {
  const updatedClient: User = userRepo.create({
    ...user,
    ...requestBody,
  });

  await userRepo.save(updatedClient);

  return createUserResponseSchema.parse(updatedClient);
};

export const softDeleteUserService = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};
