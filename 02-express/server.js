/**
 * Express Server
 */

// Require express
const express = require("express");
const _ = require("lodash");
const oneliners = require("./data/oneliners.json");
const PORT = 3000;

// Create a new Express app
const app = express();

// Listen for incoming GET request to "/"
app.get("/", (req, res) => {
	console.log("Someone request to GET my (g)root");
	res.send({
		message: "Oh, hi there 😊",
	});
});

// Listen for incoming GET request to "/joke"
app.get("/joke", (req, res) => {
	// Somehow get all oneliners from `data/oneliners.json`
	// Get a random oneliner from the array of oneliners
	// Respond with an object with the oneliner as the `joke` attribute
	const i = _.random(oneliners.length - 1);
	const joke = oneliners[i];

	res.send({
		joke,  // joke: joke
	});
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
