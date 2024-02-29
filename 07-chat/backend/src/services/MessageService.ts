/**
 * Message Service
 */
import { ChatMessageData } from "@shared/types/SocketTypes";
import prisma from "../prisma";

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
