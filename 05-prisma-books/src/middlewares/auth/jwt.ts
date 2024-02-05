/**
 * JWT Authentication Middleware
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response, NextFunction } from "express";

// Create a new debug instance
const debug = Debug("prisma-books:jwt");

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/jwt! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 2. Split Authorization header on ` `
	// "Bearer <token>"
	debug("Authorization header: %o", req.headers.authorization);
	const [authSchema, token] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is "Bearer", otherwise bail 🛑
	if (authSchema.toLowerCase() !== "bearer") {
		debug("Authorization schema isn't Bearer");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 4. Verify token and attach payload to request, otherwise bail 🛑

	// 5. Profit 💰🤑
	next();
}
