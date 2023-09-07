-- CreateEnum
CREATE TYPE "Measure" AS ENUM ('KG', 'LBS');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ReportAggregator" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReportAggregator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightEntry" (
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "measure" "Measure" NOT NULL DEFAULT 'KG',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportAggregatorId" TEXT NOT NULL,

    CONSTRAINT "WeightEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportAggregator_userId_key" ON "ReportAggregator"("userId");

-- CreateIndex
CREATE INDEX "ReportAggregator_userId_idx" ON "ReportAggregator"("userId");

-- CreateIndex
CREATE INDEX "Account_providerAccountId_idx" ON "Account"("providerAccountId");

-- CreateIndex
CREATE INDEX "User_id_email_idx" ON "User"("id", "email");

-- AddForeignKey
ALTER TABLE "ReportAggregator" ADD CONSTRAINT "ReportAggregator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightEntry" ADD CONSTRAINT "WeightEntry_reportAggregatorId_fkey" FOREIGN KEY ("reportAggregatorId") REFERENCES "ReportAggregator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
