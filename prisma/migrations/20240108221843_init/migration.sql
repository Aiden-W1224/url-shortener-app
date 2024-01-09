-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "OSType" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "deviceType" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Earth';
