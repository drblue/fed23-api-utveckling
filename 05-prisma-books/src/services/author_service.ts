/**
 * Author Service
 */
import prisma from "../prisma";
import { CreateAuthor, UpdateAuthor } from "../types/Author.types";

/**
 * Get all authors
 */
export const getAuthors = async () => {
	return await prisma.author.findMany();
}

/**
 * Get a single Author
 *
 * @param authorId The ID of the Author to get
 */
export const getAuthor = async (authorId: number) => {
	return await prisma.author.findUniqueOrThrow({
		where: {
			id: authorId,
		},
		include: {
			books: true,
		},
	});
}

/**
 * Create an author
 *
 * @param data Author data
 */
export const createAuthor = async (data: CreateAuthor) => {
	return await prisma.author.create({
		data,
	});
}

/**
 * Update an author
 *
 * @param authorId The ID of the Author to update
 * @param data Author data
 * @returns
 */
export const updateAuthor = async (authorId: number, data: UpdateAuthor) => {
	return prisma.author.update({
		where: {
			id: authorId,
		},
		data,
	});
}

/**
 * Delete an author
 *
 * @param authorId The id of the author to delete
 */
export const deleteAuthor = async (authorId: number) => {
	return await prisma.author.delete({
		where: {
			id: authorId,
		}
	});
}
