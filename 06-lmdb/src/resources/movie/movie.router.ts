import express from "express";
import { Movie } from "./movie.model";
const router = express.Router();

/**
 * GET /movies
 */
router.get("/", async (req, res) => {
	try {
		// Find all movies
		const movies = await Movie.find({});

		res.send({
			status: "success",
			data: movies,
		});

	} catch (err) {
		console.error(err);
		res.status(500).send({
			status: "error",
			message: "Error thrown when finding movies",
		});
	}
});

export default router;
