/*
  Warnings:

  - You are about to drop the `DB` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_dBId_fkey";

-- DropForeignKey
ALTER TABLE "DB" DROP CONSTRAINT "DB_userId_fkey";

-- DropTable
DROP TABLE "DB";

-- CreateTable
CREATE TABLE "Database" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_dBId_fkey" FOREIGN KEY ("dBId") REFERENCES "Database"("id") ON DELETE SET NULL ON UPDATE CASCADE;
