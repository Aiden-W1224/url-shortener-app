/*
  Warnings:

  - You are about to drop the column `OSType` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `deviceType` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "OSType",
DROP COLUMN "deviceType",
DROP COLUMN "location";
