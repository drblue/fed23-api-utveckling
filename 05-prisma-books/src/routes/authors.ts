import express from "express";
import prisma from "../prisma";
const router = express.Router();

/**
 * GET /authors
 *
 * Get all authors
 */
router.get("/", async (req, res) => {
	try {
		const authors = await prisma.author.findMany();
		res.send(authors);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /authors/:authorId
 *
 * Get a single author
 */
router.get("/:authorId", async (req, res) => {
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
			console.log(err);
			res.status(404).send({ message: "Author Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}

	}
});

/**
 * POST /authors
 *
 * Create a author
 */
router.post("/", async (req, res) => {
	try {
		const author = await prisma.author.create({
			data: req.body,
		});
		res.status(201).send(author);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when creating the record in the database" });
	}
});

/**
 * PATCH /authors/:authorId
 *
 * Update a author
 */
router.patch("/:authorId", async (req, res) => {
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
});

/**
 * DELETE /authors/:authorId
 *
 * Delete a author
 */
router.delete("/:authorId", async (req, res) => {
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
});

export default router;
