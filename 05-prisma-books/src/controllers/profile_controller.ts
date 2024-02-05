/**
 * Profile Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { addUserBooks, getUserBooks, removeUserBook } from "../services/user_service";

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

	// Respond with ID 🪪
	res.send({
		status: "success",
		data: {
			id: req.token.sub,
			name: req.token.name,
			email: req.token.email,
		},
	});
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
