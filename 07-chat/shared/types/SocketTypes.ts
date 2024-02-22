export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void;
	chatMessage: (msg: ChatMessageData) => void;
	userJoined: (username: string, timestamp: number) => void;
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	sendChatMessage: (msg: ChatMessageData) => void;
	userJoinRequest: (username: string, callback: (success: boolean) => void) => void;
}

// Message payload
export interface ChatMessageData {
	content: string;
	timestamp: number;
	username: string;
}
