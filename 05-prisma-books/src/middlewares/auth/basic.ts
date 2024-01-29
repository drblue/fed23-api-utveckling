/**
 * HTTP Basic Authentication Middleware
 */
import Debug from "debug";
import { Request, Response, NextFunction } from "express";

// Create a new debug instance
const debug = Debug("prisma-books:basic");

export const basic = (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑

	// 2. Split Authorization header on ` `
	// "Basic am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	// =>
	// [0] => "Basic"
	// [1] => "am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="

	// 3. Check that Authorization scheme is "Basic", otherwise bail 🛑

	// 4. Decode credentials from base64 => ascii

	// 5. Split credentials on `:`

	// 6. Get user from database, otherwise bail 🛑

	// 7. Verify hash against credentials, otherwise bail 🛑

	// 8. Attach user to request

	// 9. Profit 💰🤑
	next();
}
