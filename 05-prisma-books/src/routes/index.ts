import express from "express";
import { body } from "express-validator";
import authorRoutes from "./authors";
import bookRoutes from "./books";
import publisherRoutes from "./publishers";
import { register } from "../controllers/register_controller";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	});
});

/**
 * /authors
 */
router.use("/authors", authorRoutes);

/**
 * /books
 */
router.use("/books", bookRoutes);

/**
 * /publishers
 */
router.use("/publishers", publisherRoutes);

/**
 * POST /register
 *
 * Register a new user.
 */
router.post("/register", [
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
], register);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

export default router;
