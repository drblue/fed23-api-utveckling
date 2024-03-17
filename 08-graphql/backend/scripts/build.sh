#!/usr/bin/env bash

## Remove build-artifacts
if [[ -d "dist" ]];
then
	echo "Build artifacts exists, removing them..."
	rm -r ./dist
fi

## Run build
npm run build-app

## Only run migrations if DATABASE_URL is set
if [[ ! -z "$DATABASE_URL" ]];
then
	echo "DATABASE_URL exists, running migrations..."
	npx prisma migrate deploy

	## Run seed (if seed-file exists in prisma/seed.ts)
	if [[ -f "prisma/seed.ts" ]];
	then
		echo "Seed file exists, running seed..."
		npx prisma db seed
	else
		echo "Seed file does NOT exist, skipping running seed..."
	fi
else
	echo "DATABASE_URL does NOT exist, skipping running migrations..."
fi
