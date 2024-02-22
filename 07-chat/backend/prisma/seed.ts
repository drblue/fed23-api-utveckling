import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Here be all your seeds 🌱
	await prisma.room.upsert({
		where: {
			name: "Admiral",
		},
		update: {},
		create: {
			name: "Admiral",
		},
	});

	await prisma.room.upsert({
		where: {
			name: "General",
		},
		update: {},
		create: {
			name: "General",
		},
	});

	await prisma.room.upsert({
		where: {
			name: "Major",
		},
		update: {},
		create: {
			name: "Major",
		},
	});
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
