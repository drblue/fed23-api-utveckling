import express from "express";
import { body } from "express-validator";
import { index, show, store, update, destroy } from "../controllers/author_controller";
const router = express.Router();

/**
 * GET /authors
 *
 * Get all authors
 */
router.get("/", index);

/**
 * GET /authors/:authorId
 *
 * Get a single author
 */
router.get("/:authorId", show);

/**
 * POST /authors
 *
 * Create a author
 */
router.post("/", [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),
	body("birthyear")
		.optional()
		.isInt().withMessage("has to be a integer"),
], store);

/**
 * PATCH /authors/:authorId
 *
 * Update a author
 */
router.patch("/:authorId", update);

/**
 * DELETE /authors/:authorId
 *
 * Delete a author
 */
router.delete("/:authorId", destroy);

export default router;
