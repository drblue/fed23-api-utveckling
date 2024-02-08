/**
 * Validation Rules for Authentication
 */
import { body } from "express-validator";

export const loginRules = [
	body("email").trim().isEmail().withMessage("email has an email (duh)"),

	body("password")
		.isString().withMessage("password has to be a string").bail()
		.trim().notEmpty().withMessage("password can not be empty"),
];
