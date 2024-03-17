/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../../services/user_service";
import { extractAndValidateAuthHeader } from "../../helpers/auth_helper";

// Create a new debug instance
const debug = Debug("prisma-books:basic");

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic! 🙋🏽");

	let base64Payload: string; // yeah this is a ful-hack

	try {
		base64Payload = extractAndValidateAuthHeader(req, "Basic");
	} catch (err) {
		if (err instanceof Error) {
			return res.status(401).send({ status: "fail", message: err.message });
		}
		return res.status(401).send({ status: "fail", message: "Unknown authorization error" });
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
