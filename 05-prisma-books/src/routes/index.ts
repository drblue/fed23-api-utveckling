import express from "express";
import authorRoutes from "./authors";
import bookRoutes from "./books";
import publisherRoutes from "./publishers";
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	});
});

/**
 * /authors
 */
router.use(authorRoutes);

/**
 * /books
 */
router.use(bookRoutes);

/**
 * /publishers
 */
router.use(publisherRoutes);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

export default router;
