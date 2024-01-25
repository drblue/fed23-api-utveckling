/**
 * Publisher Controller
 */
import { Request, Response } from "express";
import prisma from "../prisma";

/**
 * Get all publishers
 */
export const index = async (req: Request, res: Response) => {
	try {
		const publishers = await prisma.publisher.findMany();
		res.send({ status: "success", data: publishers });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
	}
}

/**
 * Get a single publisher
 */
export const show = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);

	try {
		const publisher = await prisma.publisher.findUniqueOrThrow({
			where: {
				id: publisherId,
			},
			include: {
				books: true,
			},
		});
		res.send({ status: "success", data: publisher });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}

	}
}

/**
 * Create a publisher
 */
export const store = async (req: Request, res: Response) => {
	try {
		const publisher = await prisma.publisher.create({
			data: req.body,
		});
		res.status(201).send({ status: "success", data: publisher });

	} catch (err) {
		console.error(err);
		res.status(500).send({ status: "error", message: "Something went wrong when creating the record in the database" });
	}
}

/**
 * Update a publisher
 */
export const update = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);

	try {
		const publisher = await prisma.publisher.update({
			where: {
				id: publisherId,
			},
			data: req.body,
		});
		res.status(200).send({ status: "success", data: publisher });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}

/**
 * Delete a publisher
 */
export const destroy = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);

	try {
		await prisma.publisher.delete({
			where: {
				id: publisherId,
			}
		});
		res.status(200).send({ status: "success", data: {} });

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ status: "error", message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ status: "error", message: "Something went wrong when querying the database" });
		}
	}
}
