/**
 * Author Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-books:author_controller");

/**
 * Get all authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await prisma.author.findMany();
		res.send(authors);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);

	try {
		const author = await prisma.author.findUniqueOrThrow({
			where: {
				id: authorId,
			},
			include: {
				books: true,
			},
		});
		res.send(author);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			debug("Author with ID %d could not be found: %O", authorId, err);
			res.status(404).send({ message: "Author Not Found" });
		} else {
			debug("Error when trying to query for Author with ID %d: %O", authorId, err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}

	}
}

/**
 * Create a author
 */
export const store = async (req: Request, res: Response) => {
	try {
		const author = await prisma.author.create({
			data: req.body,
		});
		res.status(201).send(author);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when creating the record in the database" });
	}
}

/**
 * Update a author
 */
export const update = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);

	try {
		const author = await prisma.author.update({
			where: {
				id: authorId,
			},
			data: req.body,
		});
		res.status(200).send(author);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Author Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
}

/**
 * Delete a author
 */
export const destroy = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);

	try {
		await prisma.author.delete({
			where: {
				id: authorId,
			}
		});
		res.status(200).send({});

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Author Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
}
