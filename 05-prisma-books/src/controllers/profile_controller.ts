/**
 * Profile Controller
 */
import bcrypt from 'bcrypt';
import Debug from "debug";
import { Request, Response } from "express";
import { addUserBooks, getUserBooks, getUserById, removeUserBook, updateUser } from "../services/user_service";
import { matchedData } from "express-validator";
import { UpdateUser } from "../types/User.types";

// Create a new debug instance
const debug = Debug("prisma-books:profile_controller");

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.token) {
		throw new Error("Trying to access autenticated user but none exists. Did you remove autentication from this route? 🤬");
	}

	// Get current user profile
	const user = await getUserById(req.token.sub);

	// Respond with ID 🪪
	res.status(200).send({ status: "success", data: user });
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.token) {
		throw new Error("Trying to access autenticated user but none exists. Did you remove autentication from this route? 🤬");
	}

	// Get only the validated data
	const validatedData = matchedData(req) as UpdateUser;

	// If user wants to update their password, hash 🪓 and salt it 🧂
	if (validatedData.password) {
		validatedData.password = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);  // 🦹🏼‍♀️
	}

	try {
		const user = await updateUser(req.token.sub, validatedData);
		res.status(200).send({ status: "success", data: user });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			res.status(404).send({ status: "error", message: "User Not Found" });
		} else {
			debug("Error when trying to update User with ID %d: %O", req.token.sub, err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}

/**
 * Get the authenticated user's books
 */
export const getBooks = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.token) {
		throw new Error("Trying to access autenticated user but none exists. Did you remove autentication from this route? 🤬");
	}

	const userId = req.token.sub;

	try {
		const books = await getUserBooks(userId);

		res.send({
			status: "success",
			data: books,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

/**
 * Add books to the authenticated user
 */
export const addBooks = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.token) {
		throw new Error("Trying to access autenticated user but none exists. Did you remove autentication from this route? 🤬");
	}

	const userId = req.token.sub;

	try {
		const books = await addUserBooks(userId, req.body);

		res.send({
			status: "success",
			data: books,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

/**
 * Remove book from the authenticated user
 */
export const removeBook = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.token) {
		throw new Error("Trying to access autenticated user but none exists. Did you remove autentication from this route? 🤬");
	}

	const userId = req.token.sub;
	const bookId = Number(req.params.bookId);

	try {
		const books = await removeUserBook(userId, bookId);

		res.send({
			status: "success",
			data: books,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}
