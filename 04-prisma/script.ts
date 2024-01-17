import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// ... you will write your Prisma Client queries here
	console.log("It works?");

	/*
	// Get all phones and console.log them
	const phones = await prisma.phones.findMany({
		// select: {  // SELECT manufacturer, model FROM phones
		// 	manufacturer: true,
		// 	model: true,
		// },
		where: {  // SELECT * FROM phones WHERE manufacturer = "Apple";
			manufacturer: "Apple",
		},
	});
	console.log("Phones:", phones);
	*/

	// Get all users and console.log them
	const users = await prisma.users.findMany({
		// where: {
		// 	name: {
		// 		// contains: "An",  // WHERE `name` LIKE "%An%"
		// 		// startsWith: "Th",  // WHERE `name` LIKE "Th%"
		// 		endsWith: "an",  // WHERE `name` LIKE "%an"
		// 	},
		// },
		orderBy: [
			{
				name: "asc",  // ORDER BY `name`;
			},
			{
				title: "asc",  // ORDER BY `name`, `title`;
			},
		],
		take: 2,  // LIMIT 2
		skip: 4,  // OFFSET 4
	});
	console.log("Users:", users);
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
