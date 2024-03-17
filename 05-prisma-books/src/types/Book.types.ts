/**
 * Book Types
 */
import { Book } from "@prisma/client";

export type BookId = Pick<Book, "id">;

export type CreateBook = Omit<Book, "id">;

export type UpdateBook = Partial<CreateBook>;
