# Prisma Books

## Installation

Create a new, empty database in phpMyAdmin.

```bash
npm install
```

Copy `.env.example` to `.env`.

```bash
cp .env.example .env
```

Open the `.env` file in Visual Studio Code and change the username, password,
port to match your environment. Also change the database name to the name of
the database you created in phpMyAdmin.

```bash
DATABASE_URL="mysql://root:root@localhost:3306/fed23_books"
```

## Making Changes to the Database

Edit the `schema.prisma` file to make changes to the database, then generate
a new Prisma client.

```bash
npx prisma generate
```

## Usage

```bash
npm run dev
```
