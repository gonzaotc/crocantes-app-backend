/*
  Warnings:

  - A unique constraint covering the columns `[userId,sourceTypeId]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Source_userId_sourceTypeId_key" ON "Source"("userId", "sourceTypeId");
