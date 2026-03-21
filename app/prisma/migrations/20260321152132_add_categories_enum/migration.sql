/*
  Warnings:

  - Changed the type of `category` on the `TechStack` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TechStackCategory" AS ENUM ('Frontend', 'Backend', 'Fullstack', 'Mobile', 'Infrastructure', 'Database', 'Design', 'Tools');

-- AlterTable
ALTER TABLE "TechStack" DROP COLUMN "category",
ADD COLUMN     "category" "TechStackCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "TechStack_category_idx" ON "TechStack"("category");
