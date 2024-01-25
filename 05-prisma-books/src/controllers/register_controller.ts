/**
 * Register Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

// Create a new debug instance
const debug = Debug("prisma-books:register_controller");

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
	debug("req.body: %O", req.body);
	debug("validatedData: %O", validatedData);

	// Calculate a hash + salt for the password

	// Store the user in the database

	// Respond with 201 Created + status success
	res.status(201).send({ status: "success", data: null });
}
