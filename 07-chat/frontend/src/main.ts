import { io, Socket } from "socket.io-client";
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents
} from "@shared/types/SocketTypes";
import "./assets/scss/style.scss";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

const messageEl = document.querySelector("#message") as HTMLInputElement;
const messageFormEl = document.querySelector("#message-form") as HTMLFormElement;
const messagesEl = document.querySelector("#messages") as HTMLUListElement;

// Connect to Socket.IO Server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST);

// Add message to the chat
const addMessageToChat = (msg: ChatMessageData, ownMessage = false) => {
	// Create a new LI element
	const msgEl = document.createElement("li");

	// Set class of LI to "message"
	msgEl.classList.add("message");

	// If the message is from the user, add the class "own-message"
	if (ownMessage) {
		msgEl.classList.add("own-message");
	}

	// Set text content of the LI element to the message
	msgEl.textContent = msg.content;

	// Append the LI element to the messages element
	messagesEl.appendChild(msgEl);
}

// Listen for when connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);
});

// Listen for when server got tired of us
socket.on("disconnect", () => {
	console.log("💀 Disconnected from the server");
});

// Listen for when the nice server says hello
socket.on("hello", () => {
	console.log("🤩 Hello! Is it me you're looking for?");
});

// Listen for new chat messages
socket.on("chatMessage", (msg) => {
	console.log("📨 YAY SOMEONE WROTE SOMETHING!!!!!!!", msg);

	/**
	 * @todo 1
	 * Create a function `addMessageToChat` that takes the
	 * `msg` object as a parameter and creates a new LI-element,
	 * sets the content + styling and appends it to `messagesEl`
	 */
	addMessageToChat(msg);
});

// Send a message to the server when form is submitted
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageEl.value.trim();

	// If no message, no send
	if (!trimmedMessage) {
		return;
	}

	// Construct message payload
	const msg: ChatMessageData = {
		content: trimmedMessage,
	}

	// Send (emit) the message to the server
	socket.emit("sendChatMessage", msg);
	console.log("Emitted 'sendChatMessage' event to server", msg);

	/**
	 * @todo 2
	 * Extend the `addMessageToChat` function to know if the msg
	 * was sent by us, and if so add `.own-message` class to the
	 * LI-element before appending it to `messagesEl`
	 */
	addMessageToChat(msg, true);

	// Clear the input field
	messageEl.value = "";
	messageEl.focus();
});
