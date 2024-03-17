/**
 * TypeScript types
 */
import { Author, Book, Publisher } from "@prisma/client";

export type CreateAuthor = Omit<Author, "id">;
export type CreateBook = Omit<Book, "id">;
export type CreatePublisher = Omit<Publisher, "id">;
