/**
 * Validation Rules for User resource
 */
import { body } from "express-validator";
import { getUserByEmail } from "../services/user_service";

export const createUserRules = [
	// name required + trimmed + at least 3 chars
	body("name")
		.isString().withMessage("name has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("name has to be 3-191 chars"),

	// email required + valid email (+ unique)
	body("email")
		.trim().isEmail().withMessage("email has to be a valid email").bail()
		.custom(async (value) => {
			// check if a User with that email already exists
			const user = await getUserByEmail(value);

			if (user) {
				// user already exists, throw hissy-fit
				// return Promise.reject("Email already exists");
				throw new Error("Email already exists");
			}
		}),

	// password required + trimmed + at least 6 chars
	body("password")
		.isString().withMessage("password has to be a string").bail()
		.trim().isLength({ min: 6 }).withMessage("password has to be at least 6 chars"),
];
