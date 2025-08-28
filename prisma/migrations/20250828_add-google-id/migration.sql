-- Add googleId column to users table and unique index
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "googleId" TEXT;

-- Create unique index for googleId if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'users_googleId_key'
  ) THEN
    CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
  END IF;
END $$;
