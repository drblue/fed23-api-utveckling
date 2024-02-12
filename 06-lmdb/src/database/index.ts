import * as mongoose from "mongoose";
import Debug from "debug";

const debug = Debug("lmdb:database");

/**
 * Current MongoDB Connection
 */
let db: mongoose.Mongoose | null = null;

/**
 * Connec tto MongoDB
 */
export const connect = async () => {
	// Don't connect if we're already connected
	if (db) {
		debug("🏎️ We're already connected, you want MOAR connection?!");
		return;
	}

	// If no database is configured, throw a tantrum
	if (!process.env.DATABASE_URL) {
		throw new Error("🚨 No DATABASE_URL sert in environment!");
	}

	// Connect to the database
	const connection = await mongoose.connect(process.env.DATABASE_URL);

	// Assign connection to global variable
	db = connection;

	console.log("🥳 We're connected to MongoDB Atlas!");
}

export default db;
