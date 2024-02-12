import * as dotenv from "dotenv";
import http from "http";
import app from "./src/app";
import { connect } from "./src/database";

// Initialize dotenv so it reads our `.env`-file
dotenv.config();

// Read port to start server on from `.env`, otherwise default to port 3000
const PORT = Number(process.env.PORT) || 3000;

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Connect to database, and then listen on provided port, on all network interfaces.
 */
connect()
	.then(() => {
		// Start responding to incoming requests
		server.listen(PORT);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

/**
 * Event listener for HTTP server "error" event.
 */
server.on("error", (err: NodeJS.ErrnoException) => {
	if (err.syscall !== "listen") {
		throw err;
	}

	switch (err.code) {
		case "EACCES":
			console.error(`🦸🏻 Port ${PORT} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`🛑 Port ${PORT} is already in use in another of your fifty thousand terminals 😜`);
			process.exit(1);
			break;
		default:
			throw err;
	}
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on("listening", () => {
	console.log(`🍿 Yay, server started on http://localhost:${PORT}`);
});
