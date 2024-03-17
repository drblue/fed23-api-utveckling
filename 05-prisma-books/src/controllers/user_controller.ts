/**
 * Register Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById } from "../services/user_service";
import { CreateUser } from "../types/User.types";
import { JwtPayload, JwtRefreshPayload } from "../types/Token.types";
import { extractAndValidateAuthHeader } from "../helpers/auth_helper";

// Create a new debug instance
const debug = Debug("prisma-books:register_controller");

interface LoginRequestBody {
	email: string
	password: string
}

/**
 * Log in a user
 */
export const login = async (req: Request, res: Response) => {
	// get (destructure) email and password from request body
	const { email, password } = req.body as LoginRequestBody;

	// find user with email, otherwise bail 🛑
	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// verify credentials against hash, otherwise bail 🛑
	const result = await bcrypt.compare(password, user.password);
	if (!result) {
		debug("User %s password did not match", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// construct jwt-payload
	const payload: JwtPayload = {
		sub: user.id,
		name: user.name,
		email: user.email,
	}

	// sign payload with access-token secret and get access-token
	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug("ACCESS_TOKEN_SECRET missing in environment");
		return res.status(500).send({ status: "error", message: "No access token secret defined"});
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
	});

	// construct jwt refresh-payload
	const refreshPayload: JwtRefreshPayload = {
		sub: user.id,
	}

	// sign payload with refresh-token secret and get refresh-token
	if (!process.env.REFRESH_TOKEN_SECRET) {
		debug("REFRESH_TOKEN_SECRET missing in environment");
		return res.status(500).send({ status: "error", message: "No refresh token secret defined"});
	}
	const refresh_token = jwt.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d",
	});

	// respond with access-token
	res.send({
		status: "success",
		data: {
			access_token,
			refresh_token,
		},
	});
}

/**
 * Refresh token
 *
 * Receives a refresh-token and issues a new access-token.
 *
 * Authorization: Bearer <refresh-token>
 */
export const refresh = async (req: Request, res: Response) => {
	let token: string; // yeah this is a ful-hack

	try {
		token = extractAndValidateAuthHeader(req, "Bearer");
	} catch (err) {
		if (err instanceof Error) {
			return res.status(401).send({ status: "fail", message: err.message });
		}
		return res.status(401).send({ status: "fail", message: "Unknown authorization error" });
	}

	// 4. Verify refresh-token and extract refresh-payload, otherwise bail 🛑
	if (!process.env.REFRESH_TOKEN_SECRET) {
		debug("REFRESH_TOKEN_SECRET missing in environment");
		return res.status(500).send({ status: "error", message: "No refresh token secret defined"});
	}
	try {
		// Verify token
		const refreshPayload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as unknown as JwtRefreshPayload;
		debug("Refresh Payload: %O", refreshPayload);

		// 5. Get user from database (by id)
		const user = await getUserById(refreshPayload.sub);
		if (!user) {
			debug("User could not be found 🔎");
			return res.status(500).send({ status: "error", message: "Access denied"});
		}

		// 6. Construct access-token payload
		const payload: JwtPayload = {
			sub: user.id,
			name: user.name,
			email: user.email,
		}

		// 7. Issue new access-token
		if (!process.env.ACCESS_TOKEN_SECRET) {
			debug("ACCESS_TOKEN_SECRET missing in environment");
			return res.status(500).send({ status: "error", message: "No access token secret defined"});
		}
		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
		});

		// 8. Respond with new access_token
		res.send({
			status: "success",
			data: {
				access_token,
			},
		});

	} catch (err) {
		debug("JWT Verify failed: %O", err);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}
}

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
	// Get only the validated data from the request
	const validatedData = matchedData(req);
	debug("validatedData: %O", validatedData);

	// Calculate a hash + salt for the password
	const hashed_password = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);
	debug("plaintext password:", validatedData.password);
	debug("hashed password:", hashed_password);

	const data = {
		...validatedData,
		password: hashed_password,
	} as CreateUser;

	// Store the user in the database
	try {
		const user = await createUser(data);

		// Respond with 201 Created + status success
		res.status(201).send({ status: "success", data: user });

	} catch (err) {
		debug("Error when trying to create User: %O", err);
		return res.status(500).send({ status: "error", message: "Could not create user in database" });
	}
}
