/*
  Warnings:

  - Added the required column `availability` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "availability" TEXT NOT NULL;
