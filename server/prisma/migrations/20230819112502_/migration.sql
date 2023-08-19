/*
  Warnings:

  - You are about to drop the `Schema` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `schema` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_schemaId_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "schema" JSONB NOT NULL;

-- DropTable
DROP TABLE "Schema";
