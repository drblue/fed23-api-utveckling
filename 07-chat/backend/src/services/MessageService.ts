/**
 * Message Service
 */
import { ChatMessageData } from "@shared/types/SocketTypes";
import prisma from "../prisma";

/**
 * Get latest messages sent to a room
 *
 * @param roomId ID of room
 * @param maxAge Max age in seconds
 */
export const getLatestMessages = (roomId: string, maxAge = 3600) => {
	const past = Date.now() - maxAge * 1000;

	return prisma.message.findMany({
		where: {
			roomId,
			timestamp: {
				gte: past,
			},
		},
		orderBy: {
			timestamp: "asc",
		},
		take: -100,
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
