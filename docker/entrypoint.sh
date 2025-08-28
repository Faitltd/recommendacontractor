#!/bin/sh
set -e

# Run database migrations
if [ -n "$DATABASE_URL" ]; then
  echo "Running database migrations..."
  npx prisma migrate deploy
else
  echo "DATABASE_URL not set, skipping migrations"
fi

# Start the app
exec node build/index.js
