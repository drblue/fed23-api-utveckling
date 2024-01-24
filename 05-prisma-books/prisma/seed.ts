import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Here be all your seeds 🌱
	await prisma.publisher.upsert({
		where: {
			id: 1,
		},
		update: {},
		create: {
			id: 1,
			name: "Hutchinson",
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
