/*
  Warnings:

  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "proviers" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "proviers" NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
