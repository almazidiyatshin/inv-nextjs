-- CreateTable
CREATE TABLE "Vtb" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eqmx" INTEGER NOT NULL,
    "oblg" INTEGER NOT NULL,
    "gold" INTEGER NOT NULL,

    CONSTRAINT "Vtb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sber" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sbmx" INTEGER NOT NULL,
    "sbcb" INTEGER NOT NULL,
    "sbgb" INTEGER NOT NULL,
    "sbrb" INTEGER NOT NULL,
    "sbgd" INTEGER NOT NULL,

    CONSTRAINT "Sber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usd" INTEGER NOT NULL,
    "rub" INTEGER NOT NULL,

    CONSTRAINT "Cash_pkey" PRIMARY KEY ("id")
);
