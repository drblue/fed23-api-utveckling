import express from "express";
import * as movieController from "./movie.controller";
const router = express.Router();

/**
 * GET /movies
 */
router.get("/", movieController.index);

export default router;
