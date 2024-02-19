/**
 * Socket Controller
 */
import Debug from "debug";
import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketTypes";

// Create a new debug instance
const debug = Debug("chat:socket_controller");

// Handle a user connecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	debug("🙋 A user connected", socket.id);

	// Say hello to the user
	socket.emit("hello");
	debug("🤩 Said hello to the nice user", socket.id);

	// Listen for incoming chat messages
	socket.on("sendChatMessage", (msg) => {
		debug('📨 New chat message', socket.id, msg);

		// Broadcast message to everyone connected EXCEPT the sender
		socket.broadcast.emit("chatMessage", msg);
	});

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("👋🏻 A user disconnected", socket.id);
	});
}
