import express from "express";
import { addBooks, getBooks, getProfile, removeBook, updateProfile } from "../controllers/profile_controller";
import validateRequest from "../middlewares/validate_request";
import { updateUserRules } from "../validations/user_rules";
const router = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
router.get("/", getProfile);

/**
 * UPDATE /profile
 *
 * Update the authenticated user's profile
 */
router.patch("/", updateUserRules, validateRequest, updateProfile);

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

/**
 * DELETE /profile/books/:bookId
 *
 * Unlink book from the authenticated user
 */
router.delete("/books/:bookId", removeBook);

export default router;
