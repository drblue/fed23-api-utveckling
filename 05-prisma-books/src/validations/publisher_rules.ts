/**
 * Validation Rules for Publisher resource
 */
import { body } from "express-validator";

export const createPublisherRules = [
	body("name")
		.isString().withMessage("name has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("name has to be 3-191 chars"),
];

export const updatePublisherRules = [
	body("name")
		.optional()
		.isString().withMessage("name has to be a string").bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage("name has to be 3-191 chars"),
];
