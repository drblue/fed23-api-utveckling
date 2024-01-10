/**
 * Express Server
 */

// Require express
const express = require("express");
const _ = require("lodash");
const fs = require("node:fs/promises");
const morgan = require("morgan");
const oneliners = require("./data/oneliners.json");
const PORT = 3000;

// Create a new Express app
const app = express();

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

// Listen for incoming GET request to "/users"
app.get("/users", (req, res) => {
	res.send([
		{
			username: "johan",
			profilePicture: "https://thumb.ac-illust.com/3c/3cea0e36d984553348ca536f07ca7617_t.jpeg",
		},
		{
			username: "pelle",
			profilePicture: null,
		},
		{
			username: "kajsa",
			profilePicture: null,
		},
		{
			username: "mimmi",
			profilePicture: null,
		},
	]);
});

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on localhost:${PORT}`);
});
