/*
  Warnings:

  - Changed the type of `balance` on the `InrWallet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "InrWallet" DROP COLUMN "balance",
ADD COLUMN     "balance" INTEGER NOT NULL;
