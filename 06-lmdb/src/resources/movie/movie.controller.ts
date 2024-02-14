import Debug from "debug";
import { Request, Response } from "express";
import mongoose from "mongoose";
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

/**
 * Get a single movie
 */
export const show = async (req: Request, res: Response) => {
	const movieId = req.params.movieId;

	try {
		// Find a single movie
		const movie = await Movie.findById(movieId).populate("director", "name");

		// If no movie was found, report 404
		if (!movie) {
			res.status(404).send({ status: "fail", message: "No such movie exists" });
			return;
		}

		res.send({
			status: "success",
			data: movie,
		});

	} catch (err) {
		debug("Error thrown when finding movie", err);
		res.status(500).send({
			status: "error",
			message: "Error thrown when finding movie",
		});
	}
}

/**
 * Create a new movie
 */
export const store = async (req: Request, res: Response) => {
	try {
		// Create and save a new Movie
		const movie = await Movie.create(req.body);

		res.status(201).send({
			status: "success",
			data: movie,
		});

	} catch (err) {
		debug("Error thrown when creating movie", err);
		if (err instanceof mongoose.Error.ValidationError) {
			res.status(400).send({
				status: "fail",
				message: err.message,
			});
			return;
		}

		res.status(500).send({
			status: "error",
			message: "Error thrown when creating movie",
		});
	}
}

/**
 * Update a movie
 */
export const update = async (req: Request, res: Response) => {
	const movieId = req.params.movieId;

	try {
		// Update Movie
		const movie = await Movie.findByIdAndUpdate(movieId, req.body);

		res.status(200).send({
			status: "success",
			data: movie,
		});

	} catch (err) {
		debug("Error thrown when updating movie", err);
		if (err instanceof mongoose.Error.ValidationError) {
			res.status(400).send({
				status: "fail",
				message: err.message,
			});
			return;
		}

		res.status(500).send({
			status: "error",
			message: "Error thrown when updating movie",
		});
	}
}
