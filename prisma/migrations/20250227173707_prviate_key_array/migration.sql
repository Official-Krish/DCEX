/*
  Warnings:

  - The `privateKey` column on the `SolWallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SolWallet" DROP COLUMN "privateKey",
ADD COLUMN     "privateKey" TEXT[];
