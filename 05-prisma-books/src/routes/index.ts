import express from "express";
import authorRoutes from "./authors";
import bookRoutes from "./books";
import profileRoutes from "./profile";
import publisherRoutes from "./publishers";
import { login, refresh, register } from "../controllers/user_controller";
import { validateAccessToken } from "../middlewares/auth/jwt";
import validateRequest from "../middlewares/validate_request";
import { createUserRules } from "../validations/user_rules";
import { loginRules } from "../validations/auth_rules";
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
 * POST /login
 *
 * Log in a user.
 */
router.post("/login", loginRules, validateRequest, login);

/**
 * POST /refresh
 *
 * Refresh token.
 */
router.post("/refresh", refresh);

/**
 * POST /register
 *
 * Register a new user.
 */
router.post("/register", createUserRules, validateRequest, register);

/**
 * /profile 👮🏻‍♂️
 */
router.use("/profile", validateAccessToken, profileRoutes);

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
