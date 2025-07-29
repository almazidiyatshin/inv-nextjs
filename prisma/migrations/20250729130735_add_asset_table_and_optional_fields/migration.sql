-- AlterTable
ALTER TABLE "AssetCurrentState" ADD COLUMN     "assetId" INTEGER,
ADD COLUMN     "type" "EAssetType",
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AssetRecord" ADD COLUMN     "assetId" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EAssetType" NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_name_key" ON "Asset"("name");

-- AddForeignKey
ALTER TABLE "AssetRecord" ADD CONSTRAINT "AssetRecord_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetCurrentState" ADD CONSTRAINT "AssetCurrentState_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
