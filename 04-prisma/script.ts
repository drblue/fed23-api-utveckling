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

	/*
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
	*/

	/*
	// Get the _first_ user that matches our query
	const first_user = await prisma.users.findFirst({
		where: {
			name: "Leeloo",
		},
	});
	console.log("First User:", first_user);
	*/

	/*
	// Get the user with ID 4
	const neo = await prisma.users.findUnique({
		where: {
			id: 4,
		},
	});
	console.log("Neo:", neo);
	*/

	/*
	// Get the user with ID 4 and their phone (if they have any)
	const user = await prisma.users.findUnique({
		where: {
			id: 4,
		},
	});
	console.log("User:", user);
	if (user) {
		const user_phones = await prisma.phones.findMany({
			where: {
				user_id: user.id,
			},
		});
		console.log("User phones:", user_phones);
	}
	*/

	/*
	// Get the user with ID 4 and their phone (if they have any)
	const neo_with_phone = await prisma.users.findUnique({
		where: {
			id: 4,
		},
		include: {
			phones: true,
		},
	});
	console.log("Neo with phone 🍌:", neo_with_phone);
	*/

	/*
	// Get all users and their phone(s)
	const users_with_phones = await prisma.users.findMany({
		include: {
			phones: true,
		},
	});
	console.log("Users with phone(s):");
	console.dir(users_with_phones, { depth: null });
	*/

	// Get all phones and their user (if they have one)
	const phones_with_user = await prisma.phones.findMany({
		include: {
			user: true,
		}
	});
	console.log("Phones with user:", phones_with_user);
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
