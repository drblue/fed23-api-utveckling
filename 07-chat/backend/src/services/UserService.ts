/**
 * User Service
 */
import { User } from "@shared/types/Models";
import prisma from "../prisma";

/**
 * Get users currently online in a room
 *
 * @param roomId ID of room
 */
export const getUsersInRoom = (roomId: string) => {
	return prisma.user.findMany({
		where: {
			roomId,
		},
		orderBy: {
			username: "asc",
		},
	});
}

/**
 * Get a single user
 *
 * @param userId User ID (in our app it's the socket's id)
 */
export const getUser = (userId: string) => {
	return prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
}

/**
 * Create a new user
 *
 * @param data User information
 * @returns
 */
export const createUser = (data: User) => {
	return prisma.user.create({
		data,
	});
}

/**
 * Delete a single user
 *
 * @param userId User ID (in our app it's the socket's id)
 */
export const deleteUser = (userId: string) => {
	return prisma.user.delete({
		where: {
			id: userId,
		},
	});
}

/**
 * Delete all the users
 *
 */
export const deleteAllUsers = () => {
	return prisma.user.deleteMany();
}
