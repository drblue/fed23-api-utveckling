/**
 * Express Server
 */

// Require express
const express = require("express");
const PORT = 3000;

// Create a new Express app
const app = express();

// Listen for incoming GET request to "/"
app.get("/", (req, res) => {
	console.log("Someone request to GET my (g)root");
	res.send("Oh, hi there 😊");
});

// Listen for incoming GET request to "/coffee"
app.get("/coffee", (req, res) => {
	res.send("Is good for you!");
});

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on localhost:${PORT}`);
});
