/*
  Warnings:

  - You are about to drop the column `topRepos` on the `GithubStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GithubStats" DROP COLUMN "topRepos";

-- CreateTable
CREATE TABLE "GithubRepo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "language" TEXT,
    "description" TEXT,
    "statsId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GithubRepo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GithubRepo_statsId_idx" ON "GithubRepo"("statsId");

-- AddForeignKey
ALTER TABLE "GithubRepo" ADD CONSTRAINT "GithubRepo_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "GithubStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
