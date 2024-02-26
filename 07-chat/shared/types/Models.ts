export {}

export interface Room {
	id: string;
	name: string;
}

export interface User {
	id: string;
	username: string;
	roomId: string;
}
