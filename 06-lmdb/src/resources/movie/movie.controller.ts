import { Request, Response } from "express";
import Debug from "debug";
import { Movie } from "./movie.model";

const debug = Debug("lmdb:movie.controller");

/**
 * Get all movies
 */
export const index = async (req: Request, res: Response) => {
	try {
		// Find all movies
		const movies = await Movie
			.find({})
			.sort({ title: 1, release_year: 1 });
			// .sort("title");

		res.send({
			status: "success",
			data: movies,
		});

	} catch (err) {
		debug("Error thrown when finding movies", err);
		res.status(500).send({
			status: "error",
			message: "Error thrown when finding movies",
		});
	}
}
