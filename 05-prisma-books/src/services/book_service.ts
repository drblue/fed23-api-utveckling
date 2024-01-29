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
}

/**
 * Get a single Book
 *
 * @param bookId The ID of the Book to get
 */
export const getBook = async (bookId: number) => {
}

/**
 * Create an book
 *
 * @param data Book data
 */
export const createBook = async (data: CreateBook) => {
}

/**
 * Update an book
 *
 * @param bookId The ID of the Book to update
 * @param data Book data
 * @returns
 */
export const updateBook = async (bookId: number, data: UpdateBook) => {
}

/**
 * Delete an book
 *
 * @param bookId The id of the book to delete
 */
export const deleteBook = async (bookId: number) => {
}

/**
 * Link book to author(s)
 *
 * @param bookId The ID of the Book to link
 * @param authorIds The ID(s) of the Author(s) to link
 */
export const addAuthor = async (bookId: number, authorIds: AuthorId | AuthorId[]) => {
}

/**
 * Unlink an author from a book
 *
 * @param bookId The ID of the Book to unlink
 * @param authorId The ID of the Author to unlink
 */
export const removeAuthor = async (bookId: number, authorId: number) => {
}
