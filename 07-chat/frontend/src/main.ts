import { io, Socket } from "socket.io-client";
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents,
	UserJoinResponse
} from "@shared/types/SocketTypes";
import "./assets/scss/style.scss";
import { User } from "@shared/types/Models";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

// Forms
const messageEl = document.querySelector("#message") as HTMLInputElement;
const messageFormEl = document.querySelector("#message-form") as HTMLFormElement;
const roomSelectEl = document.querySelector("#room") as HTMLSelectElement;
const usernameFormEl = document.querySelector("#username-form") as HTMLFormElement;
const usernameInputEl = document.querySelector("#username") as HTMLInputElement;

// Lists
const messagesEl = document.querySelector("#messages") as HTMLUListElement;

// Views
const chatView = document.querySelector("#chat-wrapper") as HTMLDivElement;
const startView = document.querySelector("#start") as HTMLDivElement;

// User Details
let roomId: string | null = null;
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

	// Scroll to the bottom of the messages list
	msgEl.scrollIntoView({ behavior: "smooth" });
}

// Add notice to the chat
const addNoticeToChat = (msg: string, timestamp?: number) => {
	if (!timestamp) {
		timestamp = Date.now();
	}

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

	// Scroll to the bottom of the messages list
	noticeEl.scrollIntoView({ behavior: "smooth" });
}

// Update online users list
const updateOnlineUsers = (users: User[]) => {
	const onlineUsersEl = document.querySelector("#online-users") as HTMLUListElement;
	onlineUsersEl.innerHTML = users
		// .sort(a => a.id === socket.id ? 1 : 0)
		.map(user =>
			user.id === socket.id
				? `<li class="me"><span>&#x1f9b8;</span> ${user.username}</li>`
				: `<li><span>&#x1f47d;</span> ${user.username}</li>`
		)
		.join("");
}

// Show chat view
const showChatView = () => {
	startView.classList.add("hide");
	chatView.classList.remove("hide");
}

// Show welcome/"start" view
const showWelcomeView = () => {
	const connectBtnEl = document.querySelector("#connectBtn") as HTMLButtonElement;
	const roomEl = document.querySelector("#room") as HTMLSelectElement;

	// Disable Connect-button and clear room list
	connectBtnEl.disabled = true;
	roomEl.innerHTML = `<option value="" selected>Loading...</option>`;

	// Request a list of rooms from the server
	// Once we get them, populate the dropdown with rooms
	// After that, enable the Connect button
	console.log("🏨 Requesting rooms");
	socket.emit("getRoomList", (rooms) => {
		// We gots lots of rooms
		console.log("YAY ROOMS!", rooms);

		// Update room list with options for each room
		roomEl.innerHTML = rooms
			.map(room => `<option value="${room.id}">${room.name}</option>`)
			.join("");

		// Enable Connect-button once we have a room list
		connectBtnEl.disabled = false;
	});

	// Hide chat view
	chatView.classList.add("hide");

	// Unhide welcome view
	startView.classList.remove("hide");
}

/**
 * Socket handlers
 */
const handleUserJoinRequestCallback = (response: UserJoinResponse) => {
	console.log("Join was successful?", response);

	if (!response.success || !response.room) {
		alert("Could not join room (for some reason)");
		return;
	}

	// Update chat view title with room name
	const chatTitleEl = document.querySelector("#chat-title") as HTMLHeadingElement;
	chatTitleEl.innerText = response.room.name;

	// Update userlist with users in the room
	updateOnlineUsers(response.room.users);

	// Show chat view
	showChatView();
}

// Listen for when connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);

	// Show welcome view
	showWelcomeView();
});

// Listen for when server got tired of us
socket.on("disconnect", () => {
	console.log("💀 Disconnected from the server");
});

// Listen for when we're reconnected (either due to our or the servers connection)
socket.io.on("reconnect", () => {
	console.log("🍽️ Reconnected to the server");

	// Emit `userJoinRequest` event, but only if we were in the chat previously
	if (username && roomId) {
		socket.emit("userJoinRequest", username, roomId, handleUserJoinRequestCallback);
		addNoticeToChat("You're reconnected");
	}
});

// Listen for when the nice server says hello
socket.on("hello", () => {
	console.log("🤩 Hello! Is it me you're looking for?");
});

// Listen for new chat messages
socket.on("chatMessage", (msg) => {
	console.log("📨 New message received:", msg);

	addMessageToChat(msg);
});

// Listen for an updated list of online users
socket.on("onlineUsers", (users) => {
	console.log("Got a new list of online users:", users);
	updateOnlineUsers(users);
});

// Listen for when a new user joins the chat
socket.on("userJoined", (username, timestamp) => {
	console.log("👶🏻 A new user has joined the chat:", username, timestamp);

	addNoticeToChat(`${username} has joined the chat`, timestamp);
});

// Listen for when a new user leaves the chat
socket.on("userLeft", (username, timestamp) => {
	console.log("👋🏻 A user has left the chat:", username, timestamp);

	addNoticeToChat(`${username} has left the chat`, timestamp);
});

// Get username from form and then show chat
usernameFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// Get username and room
	roomId = roomSelectEl.value;
	username = usernameInputEl.value.trim();

	// If no username or room, no join
	if (!username || !roomId) {
		return;
	}

	// Emit `userJoinRequest`-event to the server and wait for acknowledgement
	// BEFORE showing the chat view
	socket.emit("userJoinRequest", username, roomId, handleUserJoinRequestCallback);
	console.log(`Emitted 'userJoinRequest' event to server, username=${username}, roomId=${roomId}`);
});

// Send a message to the server when form is submitted
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageEl.value.trim();

	// If no message, no send
	if (!trimmedMessage || !username || !roomId) {
		return;
	}

	// Construct message payload
	const msg: ChatMessageData = {
		content: trimmedMessage,
		roomId,
		timestamp: Date.now(),
		username,
	}

	// Send (emit) the message to the server
	socket.emit("sendChatMessage", msg);
	console.log("Emitted 'sendChatMessage' event to server", msg);

	// Add message to chat
	addMessageToChat(msg, true);

	// Clear the input field
	messageEl.value = "";
	messageEl.focus();
});
