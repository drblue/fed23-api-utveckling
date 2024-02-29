/**
 * Message Service
 */
import { ChatMessageData } from "@shared/types/SocketTypes";
import prisma from "../prisma";

/**
 * Get latest messages sent to a room
 *
 * @param roomId ID of room
 */
export const getLatestMessages = (roomId: string) => {
	return prisma.message.findMany({
		where: {
			roomId,
		},
		orderBy: {
			timestamp: "asc",
		},
	});
}

/**
 * Create (save) a message
 *
 * @param msg Chat message
 */
export const createMessage = async (msg: ChatMessageData) => {
	// Fake latency (a slow database)
	// await new Promise(r => setTimeout(r, 500));

	return prisma.message.create({
		data: msg,
	});
}
