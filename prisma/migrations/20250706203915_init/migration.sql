-- CreateEnum
CREATE TYPE "EAssetType" AS ENUM ('SHARE', 'BOND', 'METAL', 'MONEY');

-- CreateEnum
CREATE TYPE "ECurrency" AS ENUM ('USD', 'RUB');

-- CreateEnum
CREATE TYPE "EPortfolioType" AS ENUM ('BROKERAGE', 'MONEY');

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "type" "EPortfolioType" NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "portfolioId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EAssetType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "ECurrency" NOT NULL,

    CONSTRAINT "AssetRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetCurrentState" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "ECurrency" NOT NULL,

    CONSTRAINT "AssetCurrentState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_name_key" ON "Portfolio"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AssetCurrentState_portfolioId_name_key" ON "AssetCurrentState"("portfolioId", "name");

-- AddForeignKey
ALTER TABLE "AssetRecord" ADD CONSTRAINT "AssetRecord_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetCurrentState" ADD CONSTRAINT "AssetCurrentState_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
