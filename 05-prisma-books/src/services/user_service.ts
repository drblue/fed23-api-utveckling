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

/**
 * Get a User's Books
 *
 * @param userId ID of User
 */
export const getUserBooks = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		// include: {
		// 	books: true,
		// },
	});

	return user.books;
}
