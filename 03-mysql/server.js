/**
 * Express Server
 */

// Require express
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

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

// GET all users
app.get("/users", (req, res) => {
	res.send(users);
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
