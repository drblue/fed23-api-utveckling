import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// ... you will write your Prisma Client queries here
	console.log("It works?");

	// Get all phones and console.log them
	const phones = await prisma.phones.findMany();
	console.log("Phones:", phones);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
