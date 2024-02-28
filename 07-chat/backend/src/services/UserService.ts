/**
 * User Service
 */
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
		}
	});
}
