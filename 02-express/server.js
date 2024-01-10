/**
 * Express Server
 */

// Require express
const express = require("express");
const _ = require("lodash");
const fs = require("node:fs/promises");
const morgan = require("morgan");
const oneliners = require("./data/oneliners.json");
const users = require("./data/users.json");
const PORT = 3000;

// Create a new Express app
const app = express();

// Parse any incoming JSON
app.use(express.json());

// Log information about all incoming requests using morgan
app.use(morgan("dev"));

/**
 * Log notice about all incoming requests (date + time, HTTP Verb, URL)
 *
 * We CAN use req.url to also get the query string of the URL, but it is not
 * native to Express.
 *
 * Example:
 * 2024-01-10 11:07:37 GET /joke
 * 2024-01-10 11:08:43 POST /
 */
// app.use((req, res, next) => {
// 	const now = new Date();

// 	console.log(`${now.toLocaleString()} - ${req.method} ${req.path}`);
// 	next();  // Pass request along
// });

// Listen for incoming GET request to "/"
app.get("/", (req, res) => {
	res.send({
		message: "Oh, hi there 😊",
	});
});

// Listen for incoming GET request to "/joke"
app.get("/joke", (req, res) => {
	// Somehow get all oneliners from `data/oneliners.json`
	// Get a random oneliner from the array of oneliners
	// Respond with an object with the oneliner as the `joke` attribute
	const joke = _.sample(oneliners);

	res.send({
		joke,  // joke: joke
	});
});

/**
 * GET /badjoke
 */
app.get("/badjoke", async (req, res) => {
	try {
		const rawFile = await fs.readFile("./data/oneliners.txt", "utf-8");
		const jokes = rawFile.split("\n");

		// Get a random item from the array `jokes`
		const joke = _.sample(jokes);

		// Respond with a object containing the oneliner in the `joke` attribute
		res.send({
			joke,
		});

	} catch (err) {
		console.error("ERROR! ERROR! Could not find ./data/oneliner.txt!");
		// Let requester know that something has gone wrong
		res.status(500).send({
			message: "Could not read file with oneliners",
		});
	}
});

// Listen for incoming POST request to "/"
app.post("/", (req, res) => {
	res.send({
		message: "I'm no mailbox 😡",
	});
});

// Listen for incoming GET request to "/coffee"
app.get("/coffee", (req, res) => {
	res.send({
		can_have_too_much: false,
		is_good_for_you: true,
		message: "Lolcats are funny",
		nicknames: [
			"coffee",
			"life-giving liquid",
			"black gold",
		],
	});
});

// GET all users
app.get("/users", (req, res) => {
	res.send(users);
});

// GET a single user
// GET /users/42
// GET /users/1337
// GET /users/apa
app.get("/users/:userId", (req, res) => {
	// Cast userId parameter to a Number
	const userId = Number(req.params.userId);

	// That's not a number...
	if (!userId) {
		res.status(404).send({
			message: "Invalid User ID",
		});
		return;
	}

	// Find user in users array
	const user = users.find(user => user.id === userId);

	// No user was found
	if (!user) {
		res.status(404).send({
			message: "User Not Found",
		});
		return;
	}

	// Respond with user
	res.send(user);
});

// POST /users
// Create a new user
app.post("/users", (req, res) => {
	console.log("Create user?");

	// Dump body
	console.log("req.body:", req.body);
	// console.log("username:", req.body.username);
	// console.log("name:", req.body.name);
	// console.log("email:", req.body.email);

	res.send({});
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
