/**
 * Publisher Types
 */
import { Publisher } from "@prisma/client";

export type CreatePublisher = Omit<Publisher, "id">;

export type UpdatePublisher = Partial<CreatePublisher>;
