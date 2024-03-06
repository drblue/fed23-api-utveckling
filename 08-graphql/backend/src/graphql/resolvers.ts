import { Author, Book, Publisher } from '@prisma/client';
// Resolvers define how to fetch the types defined in your schema.
import prisma from "../prisma";
import { CreateAuthor, CreateBook, CreatePublisher } from '../types';

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
		// Author create, update and delete
		createAuthor: (_parent, args: { data: CreateAuthor }) => {
			return prisma.author.create({
				data: args.data,
			});
		},
		updateAuthor: (_parent, args: { id: number, data: CreateAuthor }) => {
			return prisma.author.update({
				where: { id: args.id },
				data: args.data,
			});
		},
		deleteAuthor: (_parent, args: { id: number }) => {
			return prisma.author.delete({
				where: { id: args.id },
			});
		},

		// Book create, update and delete
		createBook: (_parent, args: { data: CreateBook }) => {
			return prisma.book.create({
				data: args.data,
			});
		},
		updateBook: (_parent, args: { id: number; data: CreateBook }) => {
			return prisma.book.update({
				where: { id: args.id },
				data: args.data,
			});
		},
		deleteBook: (_parent, args: { id: number }) => {
			return prisma.book.delete({
				where: { id: args.id },
			});
		},

		// Publisher create, update and delete
		createPublisher: (_parent, args: { data: CreatePublisher }) => {
			return prisma.publisher.create({
				data: args.data,
			});
		},
		updatePublisher: (_parent, args: { id: number; data: CreatePublisher }) => {
			return prisma.publisher.update({
				where: { id: args.id },
				data: args.data,
			});
		},
		deletePublisher: (_parent, args: { id: number }) => {
			return prisma.publisher.delete({
				where: { id: args.id },
			});
		},
	},
};

export default resolvers;
