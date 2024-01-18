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
});

export default app;
