/*
 Warnings:
 
 - The values [KG,LBS] on the enum `Measure` will be removed. If these variants are still used in the database, this will fail.
 
 */
-- Alter measures 
UPDATE "WeightEntry"
SET "measure" = 'kg'
WHERE "measure" = 'KG';
UPDATE "WeightEntry"
SET "measure" = 'lb'
WHERE "measure" = 'LBS';
-- AlterEnum
BEGIN;
CREATE TYPE "Measure_new" AS ENUM ('kg', 'lb');
ALTER TABLE "WeightEntry"
ALTER COLUMN "measure" DROP DEFAULT;
ALTER TABLE "WeightEntry"
ALTER COLUMN "measure" TYPE "Measure_new" USING ("measure"::text::"Measure_new");
ALTER TYPE "Measure"
RENAME TO "Measure_old";
ALTER TYPE "Measure_new"
RENAME TO "Measure";
DROP TYPE "Measure_old";
ALTER TABLE "WeightEntry"
ALTER COLUMN "measure"
SET DEFAULT 'kg';
COMMIT;