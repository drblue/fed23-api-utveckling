import express from "express";
import prisma from "./prisma"; // importing the prisma instance we created
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

/**
 * GET /
 */
app.get("/", (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	});
});

/**
 * GET /phones
 *
 * Get all phones
 */
app.get("/phones", async (req, res) => {
	try {
		const phones = await prisma.phones.findMany();
		res.send(phones);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /phones/:phoneId
 *
 * Get a single phone
 */
app.get("/phones/:phoneId", async (req, res) => {
	const phoneId = Number(req.params.phoneId);

	try {
		const phone = await prisma.phones.findUniqueOrThrow({
			where: {
				id: phoneId,
			},
		});
		res.send(phone);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "Phone Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}

	}
});

/**
 * GET /users
 *
 * Get all users
 */
app.get("/users", async (req, res) => {
	try {
		const users = await prisma.users.findMany();
		res.send(users);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /users/:userId
 *
 * Get a single user
 */
app.get("/users/:userId", async (req, res) => {
	const userId = Number(req.params.userId);

	try {
		const user = await prisma.users.findUniqueOrThrow({
			where: {
				id: userId,
			},
		});
		res.send(user);

	} catch (err: any) {
		if (err.code === "P2025") {
			// NotFoundError
			console.log(err);
			res.status(404).send({ message: "User Not Found" });
		} else {
			console.error(err);
			res.status(500).send({ message: "Something went wrong when querying the database" });
		}

	}
});

export default app;
