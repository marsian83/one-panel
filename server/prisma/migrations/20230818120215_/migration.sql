/*
  Warnings:

  - You are about to drop the column `dBId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schemaId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Database` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Database` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_dBId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "dBId",
ADD COLUMN     "artifactId" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "schemaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Database" ADD COLUMN     "icon" JSONB NOT NULL,
ADD COLUMN     "plan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Artifact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icon" JSONB NOT NULL,
    "databaseId" INTEGER,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schema" (
    "id" SERIAL NOT NULL,
    "definition" JSONB NOT NULL,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "Database"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "Artifact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
