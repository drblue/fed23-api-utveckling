/**
 * Register Controller
 */
import { Request, Response } from "express";

/**
 * Register a new user
 *
* @todo validate incoming data and bail if validation fails
 */
export const register = async (req: Request, res: Response) => {
	// Validate incoming data

	// Calculate a hash + salt for the password

	// Store the user in the database

	// Respond with 201 Created + status success
	res.status(201).send({ status: "success", data: null });
}
