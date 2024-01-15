/**
 * Express Server
 */

// Require express
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

// Read any .env-files
require('dotenv').config();

// console.log("DATABASE_HOST:", process.env.DATABASE_HOST);

// Get the client
const mysql = require("mysql2/promise");

// Create the connection to the database
const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
});

// Create a new Express app
const app = express();

// Parse any incoming JSON
app.use(express.json());

// Log information about all incoming requests using morgan
app.use(morgan("dev"));

// Listen for incoming GET request to "/"
app.get("/", (req, res) => {
	res.send({
		message: "Oh, hi there 😊",
	});
});

/**
 * GET /phones
 *
 * Get all phones
 */
app.get("/phones", async (req, res) => {
	const db = await connection;
	const [rows] = await db.query("SELECT * FROM phones");

	// Respond with rows
	res.send(rows);
});

/**
 * GET /phones/:phoneId
 *
 * Get a single phone
 */
app.get("/phones/:phoneId", async (req, res) => {
	const phoneId = Number(req.params.phoneId);

	const db = await connection;
	const [rows] = await db.query("SELECT * FROM phones WHERE id = ?", [phoneId]);

	// guard clause
	if (!rows.length) {
		// Respond with 404 and a message in JSON-format
		res.status(404).send({
			message: "Phone Not Found",
		});
		return;
	}

	// Respond with rows
	res.send(rows[0]);
});

/**
 * POST /phones
 *
 * Create a new phone
 */
app.post("/phones", async (req, res) => {
	console.log("Incoming!", req.body);
	const { manufacturer, model, imei } = req.body;

	const db = await connection;
	const [result] = await db.query(`INSERT INTO phones SET ?`, {
		manufacturer,
		model,
		imei,
	});

	console.log("Result:", result);

	// Send back the received data and append the id of the newly created record
	res.status(201).send({
		...req.body,
		id: result.insertId,
	});
});

/**
 * GET /users
 *
 * Get all users
 */
app.get("/users", async (req, res) => {
	// Wait for connection to be established
	const db = await connection;

	// Execute a query
	// const result = await db.query("SELECT * FROM users");

	// Extract rows from result
	// const rows = result[0];
	const [rows] = await db.query("SELECT * FROM users");

	// Respond with rows
	res.send(rows);
});

/**
 * GET /users/:userId
 *
 * Get a single user
 */
app.get("/users/:userId", async (req, res) => {
	const userId = Number(req.params.userId);

	const db = await connection;
	// SELECT * FROM users WHERE id = 2
	const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

	// guard clause
	if (!rows.length) {
		// Respond with 404 and a message in JSON-format
		res.status(404).send({
			message: "User Not Found",
		});
		return;
	}

	// Respond with rows
	res.send(rows[0]);
});

// Catch any requests that does not have a matching handler
app.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on localhost:${PORT}`);
});
