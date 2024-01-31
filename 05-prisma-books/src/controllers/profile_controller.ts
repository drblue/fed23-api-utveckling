/**
 * Profile Controller
 */
import Debug from "debug";
import { Request, Response } from "express";

// Create a new debug instance
const debug = Debug("prisma-books:profile_controller");

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.user) {
		throw new Error("Trying to access autenticated user but none exists. Did you remove autentication from this route? 🤬");
	}

	// Respond with ID 🪪
	res.send({
		status: "success",
		data: {
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		},
	});
}

/**
 * Get the authenticated user's books
 */
export const getBooks = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		data: [],
	});
}
