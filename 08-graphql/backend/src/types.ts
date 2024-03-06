/**
 * TypeScript types
 */
import { Author } from "@prisma/client";

export type CreateAuthor = Omit<Author, "id">;
