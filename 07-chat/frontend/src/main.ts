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
const messagesEl = document.querySelector("#messages") as HTMLDivElement;

// Connect to Socket.IO Server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST);

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

	// Clear the input field
	messageEl.value = "";
	messageEl.focus();
});
