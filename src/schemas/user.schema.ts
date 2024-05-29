import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(255).min(3),
  email: z.string().email().max(255).min(3),
  password: z.string().max(255).min(3),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const createUserRequestSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
  admin: true,
});

export const createUserWithoutAdminSchema = createUserRequestSchema.omit({
  admin: true,
});

export const updateUserWithoutAdminSchema =
  createUserWithoutAdminSchema.partial();

export const createUserResponseSchema = userSchema.omit({ password: true });

export const usersListResponseSchema = createUserResponseSchema.array();

export const userLoginRequestSchema = userSchema.pick({
  email: true,
  password: true,
});
