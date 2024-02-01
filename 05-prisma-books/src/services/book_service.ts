/**
 * Book Service
 */
import prisma from "../prisma";
import { AuthorId } from "../types/Author.types";
import { CreateBook, UpdateBook } from "../types/Book.types";

/**
 * Get all books
 */
export const getBooks = async () => {
	return await prisma.book.findMany();
}

/**
 * Get a single Book
 *
 * @param bookId The ID of the Book to get
 */
export const getBook = async (bookId: number) => {
	return await prisma.book.findUniqueOrThrow({
		where: {
			id: bookId,
		},
		include: {
			authors: true,
			publisher: true,
		},
	});
}

/**
 * Create an book
 *
 * @param data Book data
 */
export const createBook = async (data: CreateBook) => {
	return await prisma.book.create({
		data,
	});
}

/**
 * Update an book
 *
 * @param bookId The ID of the Book to update
 * @param data Book data
 * @returns
 */
export const updateBook = async (bookId: number, data: UpdateBook) => {
	return await prisma.book.update({
		where: {
			id: bookId,
		},
		include: {
			authors: true,
			publisher: true,
		},
		data,
	});
}

/**
 * Delete an book
 *
 * @param bookId The id of the book to delete
 */
export const deleteBook = async (bookId: number) => {
	return await prisma.book.delete({
		where: {
			id: bookId,
		},
	});
}

/**
 * Link book to author(s)
 *
 * @param bookId The ID of the Book to link
 * @param authorIds The ID(s) of the Author(s) to link
 */
export const addAuthorToBook = async (bookId: number, authorIds: AuthorId | AuthorId[]) => {
	return await prisma.book.update({
		where: {
			id: bookId,
		},
		data: {
			authors: {
				connect: authorIds,
			},
		},
		include: {
			authors: true,
		}
	});
}

/**
 * Unlink an author from a book
 *
 * @param bookId The ID of the Book to unlink
 * @param authorId The ID of the Author to unlink
 */
export const removeAuthorFromBook = async (bookId: number, authorId: number) => {
	return await prisma.book.update({
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
}
