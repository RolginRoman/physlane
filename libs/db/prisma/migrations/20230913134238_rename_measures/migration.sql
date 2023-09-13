-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.

BEGIN;
ALTER TYPE "Measure" ADD VALUE 'kg';
ALTER TYPE "Measure" ADD VALUE 'lb';
COMMIT;

-- AlterTable
ALTER TABLE "WeightEntry" ALTER COLUMN "measure" SET DEFAULT 'kg';
