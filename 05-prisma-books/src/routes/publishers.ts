import express from "express";
import { index, show, store, update, destroy } from "../controllers/publisher_controller";
import validateRequest from "../middlewares/validate_request";
import { createPublisherRules, updatePublisherRules } from "../validations/publisher_rules";
const router = express.Router();

/**
 * GET /publishers
 *
 * Get all publishers
 */
router.get("/", index);

/**
 * GET /publishers/:publisherId
 *
 * Get a single publisher
 */
router.get("/:publisherId", show);

/**
 * POST /publishers
 *
 * Create a publisher
 */
router.post("/", createPublisherRules, validateRequest, store);

/**
 * PATCH /publishers/:publisherId
 *
 * Update a publisher
 */
router.patch("/:publisherId", updatePublisherRules, validateRequest, update);

/**
 * DELETE /publishers/:publisherId
 *
 * Delete a publisher
 */
router.delete("/:publisherId", destroy);

export default router;
