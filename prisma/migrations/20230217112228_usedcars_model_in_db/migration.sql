-- CreateTable
CREATE TABLE "UsedCars" (
    "id" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "modelFullName" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "enable_auto_discounts" BOOLEAN NOT NULL DEFAULT false,
    "currencyId" TEXT,
    "count" INTEGER,
    "categoryId" INTEGER,
    "delivery" BOOLEAN NOT NULL DEFAULT false,
    "pickup" BOOLEAN NOT NULL DEFAULT true,
    "store" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "sales_notes" TEXT,
    "picture" TEXT[],
    "typePrefix" TEXT NOT NULL,
    "manufacturer_warranty" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "mileage" TEXT,
    "year" TEXT,
    "bodyType" TEXT,
    "steeringWheel" TEXT,
    "color" TEXT,
    "pts" TEXT,
    "numberOfOwners" TEXT,
    "engine" TEXT,
    "driverType" TEXT,
    "gearboxType" TEXT,
    "generation" TEXT,
    "modelShortName" TEXT,

    CONSTRAINT "UsedCars_pkey" PRIMARY KEY ("id")
);
