/**
 * JWT Authentication Middleware
 */
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types/Token.types";

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
	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug("ACCESS_TOKEN_SECRET missing in environment");
		return res.status(500).send({ status: "error", message: "No access token secret defined"});
	}
	// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIm5hbWUiOiJTZWFuIEJhbmFuIiwiZW1haWwiOiJzZWFuQGJhbmFuLnNlIiwiaWF0IjoxNzA3MTMwMjQyfQ.0vyrKDgYOtPfqXdfK1FUdbrqzqI2-WzLn_cbHocWWiA"
	try {
		// Verify token
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as unknown as JwtPayload;
		// debug("Payload: %O", payload);

		// Attach token payload to request
		req.token = payload;

	} catch (err) {
		debug("JWT Verify failed: %O", err);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 5. Profit 💰🤑
	next();
}
