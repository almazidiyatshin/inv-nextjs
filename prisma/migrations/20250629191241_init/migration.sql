-- CreateEnum
CREATE TYPE "EAssetCategory" AS ENUM ('SHARE', 'BOND', 'METAL', 'MONEY');

-- CreateEnum
CREATE TYPE "EAssetName" AS ENUM ('EQMX', 'OBLG', 'GOLD', 'SBMX', 'SBCB', 'SBGB', 'SBRB', 'SBGD', 'USD', 'RUB');

-- CreateEnum
CREATE TYPE "ECurrency" AS ENUM ('USD', 'RUB');

-- CreateEnum
CREATE TYPE "EPortfolioType" AS ENUM ('BROKERAGE', 'MONEY');

-- CreateEnum
CREATE TYPE "EPortfolioName" AS ENUM ('VTB', 'SBER', 'MONEY');

-- CreateTable
CREATE TABLE "AssetRecord" (
    "id" SERIAL NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "name" "EAssetName" NOT NULL,
    "type" "EAssetCategory" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "ECurrency" NOT NULL,

    CONSTRAINT "AssetRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" "EPortfolioName" NOT NULL,
    "type" "EPortfolioType" NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetRecord" ADD CONSTRAINT "AssetRecord_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
