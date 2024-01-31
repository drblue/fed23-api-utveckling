/**
 * Publisher Controller
 */
import { Request, Response } from "express";
import prisma from "../prisma";
import { getPublishers, getPublisher, createPublisher, updatePublisher, deletePublisher } from "../services/publisher_service";
import { matchedData, validationResult } from "express-validator";
import { CreatePublisher, UpdatePublisher } from "../types/Publisher.types";

/**
 * Get all publishers
 */
export const index = async (req: Request, res: Response) => {
	try {
		const publishers = await getPublishers();
		res.send({ status: "success", data: publishers });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

/**
 * Get a single publisher
 */
export const show = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);

	try {
		const publisher = await getPublisher(publisherId);
		res.send({ status: "success", data: publisher });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}

	}
}

/**
 * Create a publisher
 */
export const store = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data
	const validatedData = matchedData(req) as CreatePublisher;

	try {
		const publisher = await createPublisher(validatedData);
		res.status(201).send({ status: "success", data: publisher });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when creating the record in the database" });
	}
}

/**
 * Update a publisher
 */
export const update = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);

	// Check for any validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data
	const validatedData = matchedData(req) as UpdatePublisher;

	try {
		const publisher = await updatePublisher(publisherId, validatedData);
		res.status(200).send({ status: "success", data: publisher });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}

/**
 * Delete a publisher
 */
export const destroy = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);

	try {
		await deletePublisher(publisherId);
		res.status(200).send({ status: "success", data: {} });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}
