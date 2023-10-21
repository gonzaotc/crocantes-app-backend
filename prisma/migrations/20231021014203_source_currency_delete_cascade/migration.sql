/*
  Warnings:

  - Made the column `price` on table `CurrencyType` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_sourceId_fkey";

-- AlterTable
ALTER TABLE "CurrencyType" ALTER COLUMN "price" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
