import express from "express";
import movieRouter from "./resources/movie/movie.router";
import personRouter from "./resources/person/person.router";
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
 * /movies
 */
router.use("/movies", movieRouter);

/**
 * /people
 */
router.use("/people", personRouter);

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
