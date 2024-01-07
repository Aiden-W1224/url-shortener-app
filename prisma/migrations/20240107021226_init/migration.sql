/*
  Warnings:

  - Added the required column `clicked` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "clicked" INTEGER NOT NULL;
