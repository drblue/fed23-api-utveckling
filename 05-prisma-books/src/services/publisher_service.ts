/**
 * Publisher Service
 */
import prisma from "../prisma";
import { CreatePublisher, UpdatePublisher } from "../types/Publisher.types";

/**
 * Get all publishers
 */
export const getPublishers = async () => {
}

/**
 * Get a single Publisher
 *
 * @param publisherId The ID of the Publisher to get
 */
export const getPublisher = async (publisherId: number) => {
}

/**
 * Create a publisher
 *
 * @param data Publisher data
 */
export const createPublisher = async (data: CreatePublisher) => {
}

/**
 * Update a publisher
 *
 * @param publisherId The ID of the Publisher to update
 * @param data Publisher data
 * @returns
 */
export const updatePublisher = async (publisherId: number, data: UpdatePublisher) => {
}

/**
 * Delete a publisher
 *
 * @param publisherId The id of the publisher to delete
 */
export const deletePublisher = async (publisherId: number) => {
}
