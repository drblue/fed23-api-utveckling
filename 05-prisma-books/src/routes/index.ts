import express from "express";
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
	// place validation rules here

	// name required + trimmed + at least 3 chars
	// email required + valid email (+ unique)
	// password required + trimmed + at least 6 chars
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
