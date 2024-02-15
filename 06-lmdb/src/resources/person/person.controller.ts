import Debug from "debug";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Person } from "./person.model";
import { Movie } from "../movie/movie.model";

const debug = Debug("lmdb:person.controller");

/**
 * Get all people
 */
export const index = async (req: Request, res: Response) => {
	try {
		// Find all people
		const people = await Person
			.find({})
			.sort("name");

		res.send({
			status: "success",
			data: people,
		});

	} catch (err) {
		debug("Error thrown when finding people", err);
		res.status(500).send({
			status: "error",
			message: "Error thrown when finding people",
		});
	}
}

/**
 * Get a single person
 */
export const show = async (req: Request, res: Response) => {
	const personId = req.params.personId;

	try {
		// Find a single person
		const person = await Person.findById(personId);

		// Get movies where person is director
		const directing = await Movie.find({ director: personId }, ["title", "release_year"]);

		// Get movies where person is actor
		const acting = await Movie.find({ actors: personId }, ["title", "release_year"]);

		// If no person was found, report 404
		if (!person) {
			res.status(404).send({ status: "fail", message: "No such person exists" });
			return;
		}

		res.send({
			status: "success",
			data: {
				person,
				directing,
				acting,
			}
		});

	} catch (err) {
		debug("Error thrown when finding person", err);
		res.status(500).send({
			status: "error",
			message: "Error thrown when finding person",
		});
	}
}

/**
 * Create a new person
 */
export const store = async (req: Request, res: Response) => {
	try {
		// Create and save a new Person
		const person = await Person.create(req.body);

		res.status(201).send({
			status: "success",
			data: person,
		});

	} catch (err) {
		debug("Error thrown when creating person", err);
		if (err instanceof mongoose.Error.ValidationError) {
			res.status(400).send({
				status: "fail",
				message: err.message,
			});
			return;
		}

		res.status(500).send({
			status: "error",
			message: "Error thrown when creating person",
		});
	}
}

/**
 * Update a person
 */
export const update = async (req: Request, res: Response) => {
	const personId = req.params.personId;

	try {
		// Update Person
		const person = await Person.findByIdAndUpdate(personId, req.body);

		res.status(200).send({
			status: "success",
			data: person,
		});

	} catch (err) {
		debug("Error thrown when updating person", err);
		if (err instanceof mongoose.Error.ValidationError) {
			res.status(400).send({
				status: "fail",
				message: err.message,
			});
			return;
		}

		res.status(500).send({
			status: "error",
			message: "Error thrown when updating person",
		});
	}
}

/**
 * Delete a person
 */
export const destroy = async (req: Request, res: Response) => {
	const personId = req.params.personId;

	try {
		// Remove the person from any movies they are associated with
		await Movie.updateMany(
			{ director: personId },
			{ director: null }
		);
		await Movie.updateMany(
			{ actors: personId },
			{ $pull: { actors: personId } }
		);

		/*
		// Find any movies where person is director and remove that reference
		const directing = await Movie.find({ director: personId });
		directing.forEach(async movie => {
			await movie.updateOne({ director: null });
		});

		// Find any movies where person is actor and remove that reference
		const acting = await Movie.find({ acting: personId });
		acting.forEach(async movie => {
			await movie.updateOne({ actors: movie.actors?.filter(actor => actor._id !== personId) });
		});
		*/

		// Delete person
		const person = await Person.findByIdAndDelete(personId);

		// If no person was found, report 404
		if (!person) {
			res.status(404).send({ status: "fail", message: "No such person exists" });
			return;
		}

		res.send({
			status: "success",
			data: null,
		});

	} catch (err) {
		debug("Error thrown when deleting person", err);
		res.status(500).send({
			status: "error",
			message: "Error thrown when deleting person",
		});
	}
}
