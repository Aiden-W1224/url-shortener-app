/*
  Warnings:

  - A unique constraint covering the columns `[url_id]` on the table `Analytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Analytics_url_id_key" ON "Analytics"("url_id");
