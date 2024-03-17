/**
 * JWT Payload Types
 */

export type JwtPayload = {
	sub: number
	name: string
	email: string
}

export type JwtRefreshPayload = Pick<JwtPayload, "sub">;
