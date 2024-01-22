import express from "express";
import prisma from "../prisma";
const router = express.Router();

/**
 * GET /books
 *
 * Get all books
 */
router.get("/books", async (req, res) => {
	try {
		const books = await prisma.book.findMany();
		res.send(books);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /books/:bookId
 *
 * Get a single book
 */
router.get("/books/:bookId", async (req, res) => {
	const bookId = Number(req.params.bookId);

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: {
				id: bookId,
			},
			include: {
				authors: true,
				publisher: true,
			},
		});
		res.send(book);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Book Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}

	}
});

/**
 * POST /books
 *
 * Create a book
 */
router.post("/books", async (req, res) => {
	try {
		const book = await prisma.book.create({
			data: req.body,
		});
		res.status(201).send(book);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when creating the record in the database" });
	}
});

/**
 * PATCH /books/:bookId
 *
 * Update a book
 */
router.patch("/books/:bookId", async (req, res) => {
	const bookId = Number(req.params.bookId);

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: req.body,
		});
		res.status(200).send(book);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Book Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
});

/**
 * DELETE /books/:bookId
 *
 * Delete a book
 */
router.delete("/books/:bookId", async (req, res) => {
	const bookId = Number(req.params.bookId);

	try {
		await prisma.book.delete({
			where: {
				id: bookId,
			}
		});
		res.status(200).send({});

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Book Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
});

/**
 * POST /books/:bookId/authors
 *
 * Link book to author(s)
 */
router.post("/books/:bookId/authors", async (req, res) => {
	const bookId = Number(req.params.bookId);

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				authors: {
					connect: req.body,  // { "id": 7 }
				},
			},
			include: {
				authors: true,
			}
		});
		res.status(201).send(book);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Book or Author Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
});

/**
 * DELETE /books/:bookId/authors/:authorId
 *
 * Unlink an author from a book
 */
router.delete("/books/:bookId/authors/:authorId", async (req, res) => {
	const bookId = Number(req.params.bookId);
	const authorId = Number(req.params.authorId);

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				authors: {
					disconnect: {
						id: authorId,
					},
				},
			},
			include: {
				authors: true,
			}
		});
		res.status(200).send(book);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Book Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
});

export default router;
