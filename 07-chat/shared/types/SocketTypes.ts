import { Room, User } from './Models';
export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void;
	chatMessage: (msg: ChatMessageData) => void;
	userJoined: (username: string, timestamp: number) => void;
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	getRoomList: (callback: (rooms: Room[]) => void) => void;
	sendChatMessage: (msg: ChatMessageData) => void;
	userJoinRequest: (username: string, roomId: string, callback: (response: UserJoinResponse) => void) => void;
}

// Message payload
export interface ChatMessageData {
	content: string;
	roomId: string;
	timestamp: number;
	username: string;
}

// Room with Users
export interface RoomWithUsers extends Room {
	users: User[];
}

// User Join Response
export interface UserJoinResponse {
	success: boolean;
	room: RoomWithUsers | null;
}
