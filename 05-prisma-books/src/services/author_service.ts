/**
 * Author Service
 */
import prisma from "../prisma";

/**
 * Get all authors
 */
export const getAuthors = async () => {
	return await prisma.author.findMany();
}

/**
 * Get a single author
 *
 * @param authorId The id of the author to get
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
