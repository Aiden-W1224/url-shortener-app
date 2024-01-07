/*
  Warnings:

  - You are about to drop the column `test` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_test_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "test";
