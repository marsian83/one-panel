/*
  Warnings:

  - A unique constraint covering the columns `[uri]` on the table `Database` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uri` to the `Database` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Database" ADD COLUMN     "uri" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Database_uri_key" ON "Database"("uri");
