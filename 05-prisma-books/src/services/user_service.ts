/**
 * User Service
 */
import prisma from "../prisma";

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
			where: {
				email,
			},
		});
}
