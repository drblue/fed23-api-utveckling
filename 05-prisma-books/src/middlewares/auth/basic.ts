/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../../services/user_service";

// Create a new debug instance
const debug = Debug("prisma-books:basic");

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 2. Split Authorization header on ` `
	// "Basic am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	// =>
	// [0] => "Basic"
	// [1] => "am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	debug("Authorization header: %o", req.headers.authorization);
	const [authSchema, base64Payload] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is "Basic", otherwise bail 🛑
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 4. Decode credentials from base64 => ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii");
	// decodedPayload = "jn@thehiveresistance.com:abc123"

	// 5. Split credentials on `:`
	const [email, password] = decodedPayload.split(":");
	debug("Email: %s", email);
	debug("Password: %s", password);

	// 5.5. Check that user sent email and password
	if (!email || !password) {
		debug("User did not send email or password");
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 6. Get user from database, otherwise bail 🛑
	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	// 7. Verify credentials against stored hash, otherwise bail 🛑
	debug("👌🏻 User did exist: %O", user);
	const password_correct = await bcrypt.compare(password, user.password); // user.password is the hashed pwd in db
	if (!password_correct) {
		debug("Password for user %s was not correct", email);
		return res.status(401).send({ status: "fail", message: "Authorization required" });
	}

	debug("Password for user %s was correct 🥳", email);

	// 8. Attach user to request 🤩
	req.user = user;

	// 9. Profit 💰🤑
	next();
}
