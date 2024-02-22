/**
 * Socket Controller
 */
import Debug from "debug";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketTypes";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("chat:socket_controller");

// Handle a user connecting
export const handleConnection = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents>,
	io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
	debug("🙋 A user connected", socket.id);

	// Say hello to the user
	socket.emit("hello");
	debug("🤩 Said hello to the nice user", socket.id);

	// Listen for room list request
	socket.on("getRoomList", async (callback) => {
		debug("🏨 Got request for rooms");

		// Query database for list of rooms
		const rooms = await prisma.room.findMany({
			orderBy: {
				name: "asc",
			},
		});
		debug("🏨 Found rooms, sending list of rooms %o", rooms);

		// Send room list
		setTimeout(() => {
			callback(rooms);
		}, 1500);
	});

	// Listen for incoming chat messages
	socket.on("sendChatMessage", (msg) => {
		debug('📨 New chat message', socket.id, msg);

		// Broadcast message to everyone connected EXCEPT the sender
		socket.broadcast.emit("chatMessage", msg);
	});

	// Listen for a user join request
	socket.on("userJoinRequest", (username, callback) => {
		debug("👶🏽 User %s wants to join the chat", username);

		// Always let the user in (for now 😈)
		// (here we could check the username and deny access if it was already in use)
		callback(true);

		// Broadcast to everyone else that a new user has joined
		socket.broadcast.emit("userJoined", username, Date.now());
	});

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("👋🏻 A user disconnected", socket.id);
	});
}
