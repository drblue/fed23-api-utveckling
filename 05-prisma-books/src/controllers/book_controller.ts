/**
 * Book Controller
 */
import { Request, Response } from 'express'
import prisma from '../prisma'

/**
 * Get all books
 */
export const index = async (req: Request, res: Response) => {
	try {
		const books = await prisma.book.findMany();
		res.send(books);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
}

/**
 * Get a single book
 */
export const show = async (req: Request, res: Response) => {
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
}

/**
 * Create a book
 */
export const store = async (req: Request, res: Response) => {
	try {
		const book = await prisma.book.create({
			data: req.body,
		});
		res.status(201).send(book);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when creating the record in the database" });
	}
}

/**
 * Update a book
 */
export const update = async (req: Request, res: Response) => {
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
}

/**
 * Delete a book
 */
export const destroy = async (req: Request, res: Response) => {
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
}

/**
 * Link book to author(s)
 */
export const addAuthor = async (req: Request, res: Response) => {
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
}

/**
 * Unlink an author from a book
 */
export const removeAuthor = async (req: Request, res: Response) => {
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
}
