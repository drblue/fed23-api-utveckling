import express from "express";
import { addBooks, getBooks, getProfile } from "../controllers/profile_controller";
const router = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
router.get("/", getProfile);

/**
 * GET /profile/books
 *
 * Get the authenticated user's books
 */
router.get("/books", getBooks);

/**
 * POST /profile/books
 *
 * Link books to the authenticated user
 */
router.post("/books", addBooks);

export default router;
