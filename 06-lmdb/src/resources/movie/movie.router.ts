import express from "express";
import * as movieController from "./movie.controller";
const router = express.Router();

/**
 * GET /movies
 */
router.get("/", movieController.index);

/**
 * GET /movies/:movieId
 */
router.get("/:movieId", movieController.show);

/**
 * POST /movies
 */
router.post("/", movieController.store);

export default router;
