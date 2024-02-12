# LMDB - The Lousy Movie Database

This is a simple example of a backend written in TypeScript using Node.js,
Express, and Mongoose to connect to a MongoDB database.

## Installation

Create a new, empty database in MongoDB Atlas.

### Install the dependencies.

```bash
npm install
```

### Set up the environment variables.

Copy `.env.example` to `.env`.

```bash
cp .env.example .env
```

Get the connection string from MongoDB Atlas and replace the `username`,
`password`, `host`, and `dbname` in the `.env` file with the appropriate
values.

```bash
DATABASE_URL="mongodb+srv://username:password@host/dbname?retryWrites=true&w=majority"
```

## Usage

### Start the app in development mode

```bash
npm run dev
```

### Build the app for production

```bash
npm run build
```

### Start the app in production mode

```bash
npm start
```
