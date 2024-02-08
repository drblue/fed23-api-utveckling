/**
 * Validate Request middleware
 */
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Validate incoming request
 */
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const validationErrors = validationResult(req);

	// If validation errors, respond with errors and stop request ✋🏻
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// If no validation errors was found, pass request along 👋🏻
	next();
}

export default validateRequest;
