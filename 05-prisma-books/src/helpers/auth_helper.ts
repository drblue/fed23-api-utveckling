/**
 * Authentication helpers
 */
import Debug from "debug";
import { Request } from "express";

const debug = Debug("prisma-books:auth_helper");

// Type definition for the allowed authentication schemas/types
type AuthType = "Basic" | "Bearer";

export const extractAndValidateAuthHeader = (req: Request, expectedType: AuthType) => {
	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		throw new Error("Authorization header missing");
	}

	// 2. Split Authorization header on ` `
	const [authSchema, payload] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is of expected type, otherwise bail 🛑
	if (authSchema !== expectedType) {
		debug("Authorization schema isn't of expected type %s", expectedType);
		throw new Error(`Expected ${expectedType} authentication`);
	}

	return payload;
}
