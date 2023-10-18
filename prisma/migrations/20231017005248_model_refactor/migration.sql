/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `priceInUsd` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CurrencyBalance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinancesProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Portfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFinancesProvider` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyTypeId` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Currency` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `sourceId` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CurrencyBalance" DROP CONSTRAINT "CurrencyBalance_currencySymbol_fkey";

-- DropForeignKey
ALTER TABLE "CurrencyBalance" DROP CONSTRAINT "CurrencyBalance_financesProviderId_fkey";

-- DropForeignKey
ALTER TABLE "CurrencyBalance" DROP CONSTRAINT "CurrencyBalance_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFinancesProvider" DROP CONSTRAINT "UserFinancesProvider_providerId_fkey";

-- DropForeignKey
ALTER TABLE "UserFinancesProvider" DROP CONSTRAINT "UserFinancesProvider_userId_fkey";

-- DropIndex
DROP INDEX "Currency_name_key";

-- DropIndex
DROP INDEX "Currency_symbol_key";

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
DROP COLUMN "name",
DROP COLUMN "priceInUsd",
DROP COLUMN "symbol",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currencyTypeId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "sourceId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "CurrencyBalance";

-- DropTable
DROP TABLE "FinancesProvider";

-- DropTable
DROP TABLE "Portfolio";

-- DropTable
DROP TABLE "UserFinancesProvider";

-- CreateTable
CREATE TABLE "SourceType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SourceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceTypeId" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "CurrencyType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SourceType_name_key" ON "SourceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SourceType_symbol_key" ON "SourceType"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "SourceType_url_key" ON "SourceType"("url");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyType_symbol_key" ON "CurrencyType"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyType_name_key" ON "CurrencyType"("name");

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_sourceTypeId_fkey" FOREIGN KEY ("sourceTypeId") REFERENCES "SourceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_currencyTypeId_fkey" FOREIGN KEY ("currencyTypeId") REFERENCES "CurrencyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
