/**
 * User Service
 */
import prisma from "../prisma";
import { CreateUser } from "../types/User.types";

/**
 * Get a User by email
 *
 * @param email Email of user to get
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
			where: {
				email,
			},
		});
}

/**
 * Create a User
 *
 * @param data User data
 */
export const createUser = async (data: CreateUser) => {
	return await prisma.user.create({
		data,
	});
}
