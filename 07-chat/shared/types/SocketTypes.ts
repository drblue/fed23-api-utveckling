export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void;
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
}

// Message payload
export interface ChatMessageData {
}
