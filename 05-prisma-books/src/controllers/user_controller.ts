/**
 * Register Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../services/user_service";
import { CreateUser } from "../types/User.types";
import { JwtPayload } from "../types/Token.types";

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

	// respond with access-token
	res.send({
		status: "success",
		data: {
			access_token,
		},
	});
}

/**
 * Register a new user
 *
* @todo validate incoming data and bail if validation fails
 */
export const register = async (req: Request, res: Response) => {
	// Validate incoming data
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

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
