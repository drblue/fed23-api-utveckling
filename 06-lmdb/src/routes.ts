import express from "express";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "I AM MOVIE-DB-API, GIFES POPCORN PLZ 🍿",
	});
});

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: `Route ${req.method} ${req.path} does not exist`,
	});
});

export default router;
