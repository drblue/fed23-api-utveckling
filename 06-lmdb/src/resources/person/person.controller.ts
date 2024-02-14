import Debug from "debug";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Person } from "./person.model";

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

		// If no person was found, report 404
		if (!person) {
			res.status(404).send({ status: "fail", message: "No such person exists" });
			return;
		}

		res.send({
			status: "success",
			data: person,
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
