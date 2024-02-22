import { io, Socket } from "socket.io-client";
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents
} from "@shared/types/SocketTypes";
import "./assets/scss/style.scss";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

// Forms
const messageEl = document.querySelector("#message") as HTMLInputElement;
const messageFormEl = document.querySelector("#message-form") as HTMLFormElement;
const usernameFormEl = document.querySelector("#username-form") as HTMLFormElement;
const usernameInputEl = document.querySelector("#username") as HTMLInputElement;

// Lists
const messagesEl = document.querySelector("#messages") as HTMLUListElement;

// Views
const chatView = document.querySelector("#chat-wrapper") as HTMLDivElement;
const startView = document.querySelector("#start") as HTMLDivElement;

// User Details
let username: string | null = null;

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

	// Get human readable time
	const time = new Date(msg.timestamp).toLocaleTimeString();

	// Set content of the LI element to the message
	msgEl.innerHTML = ownMessage
		? `
			<span class="content">${msg.content}</span>
			<span class="time">${time}</span>
		` : `
			<span class="user">${msg.username}</span>
			<span class="content">${msg.content}</span>
			<span class="time">${time}</span>
		`;

	// Append the LI element to the messages element
	messagesEl.appendChild(msgEl);
}

// Add notice to the chat
const addNoticeToChat = (msg: string, timestamp: number) => {
	// Create a new LI element
	const noticeEl = document.createElement("li");

	// Set class of LI to "notice"
	noticeEl.classList.add("notice");

	// Get human readable time
	const time = new Date(timestamp).toLocaleTimeString();

	// Set content of the LI element to the message
	noticeEl.innerHTML = `
			<span class="content">${msg}</span>
			<span class="time">${time}</span>
		`;

	// Append the LI element to the messages element
	messagesEl.appendChild(noticeEl);
}

// Show chat view
const showChatView = () => {
	startView.classList.add("hide");
	chatView.classList.remove("hide");
}

// Show welcome/"start" view
const showWelcomeView = () => {
	chatView.classList.add("hide");
	startView.classList.remove("hide");
}

/**
 * Socket handlers
 */
const handleUserJoinRequestCallback = (success: boolean) => {
	console.log("Join was successful?", success);

	if (!success) {
		alert("NO ACCESS 4 U");
		return;
	}

	// Show chat view
	showChatView();
}

// Listen for when connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);
});

// Listen for when server got tired of us
socket.on("disconnect", () => {
	console.log("💀 Disconnected from the server");
});

// Listen for when we're reconnected (either due to our or the servers connection)
socket.io.on("reconnect", () => {
	console.log("🍽️ Reconnected to the server");

	// Emit `userJoinRequest` event, but only if we were in the chat previously
	if (username) {
		socket.emit("userJoinRequest", username, handleUserJoinRequestCallback);
		addNoticeToChat("You're reconnected", Date.now());
	}
})

// Listen for when the nice server says hello
socket.on("hello", () => {
	console.log("🤩 Hello! Is it me you're looking for?");
});

// Listen for new chat messages
socket.on("chatMessage", (msg) => {
	console.log("📨 New message received:", msg);

	/**
	 * @todo 1
	 * Create a function `addMessageToChat` that takes the
	 * `msg` object as a parameter and creates a new LI-element,
	 * sets the content + styling and appends it to `messagesEl`
	 */
	addMessageToChat(msg);
});

// Listen for when a new user joins the chat
socket.on("userJoined", (username, timestamp) => {
	console.log("👶🏻 A new user has joined the chat:", username, timestamp);

	addNoticeToChat(`${username} has joined the chat`, timestamp);
});

// Get username from form and then show chat
usernameFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedUsername = usernameInputEl.value.trim();

	// If no username, no join
	if (!trimmedUsername) {
		return;
	}

	// Set username
	username = trimmedUsername;

	// Emit `userJoinRequest`-event to the server and wait for acknowledgement
	// BEFORE showing the chat view
	socket.emit("userJoinRequest", username, handleUserJoinRequestCallback);
	console.log("Emitted 'userJoinRequest' event to server", username);
});

// Send a message to the server when form is submitted
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageEl.value.trim();

	// If no message, no send
	if (!trimmedMessage || !username) {
		return;
	}

	// Construct message payload
	const msg: ChatMessageData = {
		content: trimmedMessage,
		timestamp: Date.now(),
		username,
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
