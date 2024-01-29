/**
 * Validation Rules for User resource
 */
import { body } from "express-validator";

export const createUserRules = [
	// name required + trimmed + at least 3 chars
	body("name")
		.isString().withMessage("name has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("name has to be 3-191 chars"),

	// email required + valid email (+ unique)
	body("email")
		.trim().isEmail().withMessage("email has to be a valid email"),

	// password required + trimmed + at least 6 chars
	body("password")
		.isString().withMessage("password has to be a string").bail()
		.trim().isLength({ min: 6 }).withMessage("password has to be at least 6 chars"),
];
