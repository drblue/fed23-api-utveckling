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
		book: (_parent, args: { id: number }) => {
			return prisma.book.findUnique({
				where: {
					id: args.id,
				}
			});
		},
	},
};

export default resolvers;
