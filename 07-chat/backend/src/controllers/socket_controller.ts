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
		socket.to(msg.roomId).emit("chatMessage", msg);
	});

	// Listen for a user join request
	socket.on("userJoinRequest", async (username, roomId, callback) => {
		debug("👶🏽 User %s wants to join the room %s", username, roomId);

		// Get room from database
		const room = await prisma.room.findUnique({
			where: {
				id: roomId,
			}
		});

		// If room was not found, respond with success=false
		if (!room) {
			callback({
				success: false,
				room: null,
			});
			return;
		}

		// Join room `roomId`
		socket.join(roomId);

		// Create a User in the database and set roomId
		const user = await prisma.user.create({
			data: {
				id: socket.id,
				roomId,
				username,
			},
		});
		debug("👶🏻 Created user: %o", user);

		// Retrieve a list of Users for the Room
		const usersInRoom = await prisma.user.findMany({
			where: {
				roomId,
			}
		});
		debug("List of users in room %s (%s): %O", room.name, roomId, usersInRoom);

		// Respond with room info
		// (here we could also check the username and deny access if it was already in use)
		callback({
			success: true,
			room: {
				id: room.id,
				name: room.name,
				users: usersInRoom,  // Send the user the list of users in the room
			},
		});

		// Let everyone in the room (including the new user) know that a user has joined
		io.to(roomId).emit("userJoined", username, Date.now());
	});

	// Handle user disconnecting
	socket.on("disconnect", async () => {
		debug("👋🏻 A user disconnected", socket.id);

		// Find user in order to know which room he/she was in
		const user = await prisma.user.findUnique({
			where: {
				id: socket.id,
			},
		});

		// If user didn't exist, do nothing
		if (!user) {
			return;  // virtual shrug 🤷
		}

		// Remove user
		await prisma.user.delete({
			where: {
				id: socket.id,
			},
		});

		/**
		 * @todo Broadcast a notice to the room that the user has left
		 */

		/**
		 * @todo Also broadcast a new list of users in the room
		 */
	});
}
