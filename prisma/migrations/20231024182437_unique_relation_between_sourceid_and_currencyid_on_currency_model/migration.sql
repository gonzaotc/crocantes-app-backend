/*
  Warnings:

  - A unique constraint covering the columns `[sourceId,currencyTypeId]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Currency_sourceId_currencyTypeId_key" ON "Currency"("sourceId", "currencyTypeId");
