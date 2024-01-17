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
