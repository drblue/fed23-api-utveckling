import express from "express";
import authorRoutes from "./authors";
import bookRoutes from "./books";
import profileRoutes from "./profile";
import publisherRoutes from "./publishers";
import { register } from "../controllers/register_controller";
import { createUserRules } from "../validations/user_rules";
import { basic } from "../middlewares/auth/basic";
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
router.post("/register", createUserRules, register);

/**
 * /profile 👮🏻‍♂️
 */
router.use("/profile", basic, profileRoutes);

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
