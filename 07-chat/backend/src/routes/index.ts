/**
 * Main application routes
 */
import express from "express";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "I am a parrot - echo, echo 🦜 https://www.youtube.com/watch?v=vZw35VUBdzo",
	});
});

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
