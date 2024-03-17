# Prisma demo app

Steps for creating a brand new Node-app that uses Prisma.

## Create `package.json`

```bash
npm init -y
```

## Install typescript, ts-node and type-definitions for Node.js

```bash
npm install typescript ts-node @types/node --save-dev
```

## Create TypeScript config file

```bash
npx tsc --init
```

## Install Prisma CLI

```bash
npm install prisma --save-dev
```

## Install nodemon for a more comfortable development experience

```bash
npm install nodemon --save-dev
```

## Initialize Prisma

Will generate `prisma/schema.prisma` as well as a `.env`-file with a variable
for the database URL.

```bash
npx prisma init --datasource-provider mysql
```

## Edit `.env` and change the database URL

**N.B.!** You might have to change the port from 3306 to 8889, depending on
your environment.

```env
DATABASE_URL="mysql://root:root@localhost:3306/fed23_prisma"
```

## Add dev-command to scripts in `package.json`

Replace the `"scripts"`-section with the following content:

```json
  "scripts": {
    "dev": "nodemon script.ts"
  },
```

## (Import `fed23_phones.sql)

If you haven't already done so, browse to phpMyAdmin and create a new database.
Then click on "Import" and browse to the `fed23_phones.sql` in this repo and
then click on "Import" at the bottom of the page.

## Introspect the database

Reads the tables, columns and datatypes from the existing database and updates
`prisma/schema.prisma` with models for each table.

```bash
npx prisma db pull
```

_If you get a "Error: Prisma schema validation", then you're probably missing
the `.env` file and need to create it. Copy the contents from `.env.example`
and update according to your local environment._

## Optionally format the schema-file

If you're a caveman (or cavewoman) and does not indent your code properly, you
can run the following command to format your schema-file (as well as lint it).

```bash
npx prisma format
```

## Create `script.ts`

Create a new file named `script.ts` and paste the following content into the file:

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  console.log("It works?");
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
```

## Install express, morgan, dotenv. Also types for express and morgan

```bash
npm install express morgan dotenv
npm install @types/express @types/morgan --save-dev
```

## Copy files

Copy `src/app.ts` and `src/prisma.ts` along with `server.ts` from the Git-repo.

## Edit `package.json`

Change the dev-script to run `server.ts` instead of `script.ts`.
