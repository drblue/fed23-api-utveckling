import express from "express";
import prisma from "../prisma";
const router = express.Router();

/**
 * GET /publishers
 *
 * Get all publishers
 */
router.get("/publishers", async (req, res) => {
	try {
		const publishers = await prisma.publisher.findMany();
		res.send(publishers);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /publishers/:publisherId
 *
 * Get a single publisher
 */
router.get("/publishers/:publisherId", async (req, res) => {
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
		res.send(publisher);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}

	}
});

/**
 * POST /publishers
 *
 * Create a publisher
 */
router.post("/publishers", async (req, res) => {
	try {
		const publisher = await prisma.publisher.create({
			data: req.body,
		});
		res.status(201).send(publisher);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when creating the record in the database" });
	}
});

/**
 * PATCH /publishers/:publisherId
 *
 * Update a publisher
 */
router.patch("/publishers/:publisherId", async (req, res) => {
	const publisherId = Number(req.params.publisherId);

	try {
		const publisher = await prisma.publisher.update({
			where: {
				id: publisherId,
			},
			data: req.body,
		});
		res.status(200).send(publisher);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
});

/**
 * DELETE /publishers/:publisherId
 *
 * Delete a publisher
 */
router.delete("/publishers/:publisherId", async (req, res) => {
	res.status(405).send({ message: "Not Implemented" });
	return;

	const publisherId = Number(req.params.publisherId);

	try {
		await prisma.publisher.delete({
			where: {
				id: publisherId,
			}
		});
		res.status(200).send({});

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Publisher Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}
	}
});

export default router;
