import express from "express";
import { index, show, store, update, destroy } from "../controllers/_controller";
const router = express.Router();

/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", index);

/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:resourceId", show);

/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/", store);

/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:resourceId", update);

/**
 * DELETE /resources/:resourceId
 *
 * Delete a resource
 */
router.delete("/:resourceId", destroy);

export default router;
