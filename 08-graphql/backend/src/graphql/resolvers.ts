import { Book } from '@prisma/client';
// Resolvers define how to fetch the types defined in your schema.
import prisma from "../prisma";

const resolvers = {
	Query: {
		authors: () => {
			return prisma.author.findMany();
		},
		books: () => {
			return prisma.book.findMany();
		},
		publishers: () => {
			return prisma.publisher.findMany();
		},
		author: (_parent, args: { id: number }) => {
			return prisma.author.findUnique({
				where: {
					id: args.id,
				}
			});
		},
		book: (_parent, args: { id: number }) => {
			return prisma.book.findUnique({
				where: {
					id: args.id,
				}
			});
		},
		publisher: (_parent, args: { id: number }) => {
			return prisma.publisher.findUnique({
				where: {
					id: args.id,
				}
			});
		},
	},
	Book: {
		publisher: (parent: Book) => {
			return prisma.book.findUnique({
				where: {
					id: parent.id,
				}
			})
			.publisher();
		},
	},
};

export default resolvers;
