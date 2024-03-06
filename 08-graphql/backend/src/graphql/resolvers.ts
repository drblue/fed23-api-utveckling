import { Author, Book, Publisher } from '@prisma/client';
// Resolvers define how to fetch the types defined in your schema.
import prisma from "../prisma";
import { CreateAuthor } from '../types';

const resolvers = {
	// Resolvers for the Query fields
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

	// Resolvers for the Relation fields
	Author: {
		books: (parent: Author) => {
			return prisma.author.findUnique({
				where: {
					id: parent.id,
				},
			})
			.books();
		},
	},
	Book: {
		authors: (parent: Book) => {
			return prisma.book.findUnique({
				where: {
					id: parent.id,
				}
			})
			.authors();
		},
		publisher: (parent: Book) => {
			return prisma.book.findUnique({
				where: {
					id: parent.id,
				},
			})
			.publisher();
		},
	},
	Publisher: {
		books: (parent: Publisher) => {
			return prisma.publisher.findUnique({
				where: {
					id: parent.id,
				},
			})
			.books();
		}
	},

	// Resolvers for the Mutation fields
	Mutation: {
		createAuthor: (_parent, args: { data: CreateAuthor }) => {
			return prisma.author.create({
				data: args.data,
			});
		},
	},
};

export default resolvers;
