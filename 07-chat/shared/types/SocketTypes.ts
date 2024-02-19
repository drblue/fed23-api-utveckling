export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void;
	chatMessage: (msg: ChatMessageData) => void;
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	sendChatMessage: (msg: ChatMessageData) => void;
}

// Message payload
export interface ChatMessageData {
	content: string;
}
