/**
 * Author Types
 */
import { Author } from "@prisma/client";

export type CreateAuthor = Omit<Author, "id">;

export type UpdateAuthor = Partial<CreateAuthor>;
