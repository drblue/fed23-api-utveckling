/**
 * User Service
 */
import prisma from "../prisma";
import { BookId } from "../types/Book.types";
import { CreateUser, UpdateUser } from "../types/User.types";

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
 * Get a User by id
 *
 * @param id Id of user to get
 */
export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
			where: {
				id,
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
 * Update a user
 *
 * @param userId The ID of the User to update
 * @param data User data
 * @returns
 */
export const updateUser = async (userId: number, data: UpdateUser) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
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

/**
 * Add Book(s) to User
 *
 * @param userId User ID
 * @param bookIds Book ID(s) to link
 */
export const addUserBooks = async (userId: number, bookIds: BookId | BookId[]) => {
	const user = await prisma.user.update({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		data: {
			books: {
				connect: bookIds,
			},
		},
	});

	return user.books;
}

/**
 * Remove Book from User
 *
 * @param userId User ID
 * @param bookId Book ID to remove
 */
export const removeUserBook = async (userId: number, bookId: number) => {
	const user = await prisma.user.update({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		data: {
			books: {
				disconnect: {
					id: bookId,
				},
			},
		},
	});

	return user.books;
}
