import express from "express";
import * as personController from "./person.controller";
const router = express.Router();

/**
 * GET /people
 */
router.get("/", personController.index);

/**
 * GET /people/:personId
 */
router.get("/:personId", personController.show);

/**
 * POST /people
 */
router.post("/", personController.store);

/**
 * PATCH /people/:personId
 */
router.patch("/:personId", personController.update);

/**
 * DELETE /people/:personId
 */
router.delete("/:personId", personController.destroy);

export default router;
