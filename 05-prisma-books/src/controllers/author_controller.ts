/**
 * Author Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { createAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../services/author_service";
import { CreateAuthor, UpdateAuthor } from "../types/Author.types";

// Create a new debug instance
const debug = Debug("prisma-books:author_controller");

/**
 * Get all authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await getAuthors();
		res.send({ status: "success", data: authors });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);

	try {
		const author = await getAuthor(authorId);
		res.send({ status: "success", data: author });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			debug("Author with ID %d could not be found: %O", authorId, err);
			res.status(404).send({ status: "error", message: "Author Not Found" });
		} else {
			debug("Error when trying to query for Author with ID %d: %O", authorId, err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}

	}
}

/**
 * Create a author
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
	const validatedData = matchedData(req) as CreateAuthor;

	try {
		const author = await createAuthor(validatedData);
		res.status(201).send({ status: "success", data: author });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when creating the record in the database" });
	}
}

/**
 * Update a author
 */
export const update = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);

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
	const validatedData = matchedData(req) as UpdateAuthor;

	try {
		const author = await updateAuthor(authorId, validatedData);
		res.send({ status: "success", data: author });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Author Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}

/**
 * Delete a author
 */
export const destroy = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);

	try {
		await deleteAuthor(authorId);
		res.send({ status: "success", data: {} });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Author Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}
