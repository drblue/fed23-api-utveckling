/**
 * User Types
 */
import { User } from "@prisma/client";

export type CreateUser = Omit<User, "id">;

export type UpdateUser = Partial<CreateUser>;
