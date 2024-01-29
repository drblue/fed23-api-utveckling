/**
 * Profile Controller
 */
import { Request, Response } from "express";

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		data: null,
	});
}

/**
 * Get the authenticated user's books
 */
export const getBooks = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		data: null,
	});
}
