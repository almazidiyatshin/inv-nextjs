/*
  Warnings:

  - You are about to drop the column `name` on the `AssetCurrentState` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `AssetCurrentState` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AssetRecord` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `AssetRecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[portfolioId,assetId]` on the table `AssetCurrentState` will be added. If there are existing duplicate values, this will fail.
  - Made the column `assetId` on table `AssetCurrentState` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assetId` on table `AssetRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AssetCurrentState" DROP CONSTRAINT "AssetCurrentState_assetId_fkey";

-- DropForeignKey
ALTER TABLE "AssetRecord" DROP CONSTRAINT "AssetRecord_assetId_fkey";

-- DropIndex
DROP INDEX "AssetCurrentState_portfolioId_name_key";

-- AlterTable
ALTER TABLE "AssetCurrentState" DROP COLUMN "name",
DROP COLUMN "type",
ALTER COLUMN "assetId" SET NOT NULL;

-- AlterTable
ALTER TABLE "AssetRecord" DROP COLUMN "name",
DROP COLUMN "type",
ALTER COLUMN "assetId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AssetCurrentState_portfolioId_assetId_key" ON "AssetCurrentState"("portfolioId", "assetId");

-- AddForeignKey
ALTER TABLE "AssetRecord" ADD CONSTRAINT "AssetRecord_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetCurrentState" ADD CONSTRAINT "AssetCurrentState_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
