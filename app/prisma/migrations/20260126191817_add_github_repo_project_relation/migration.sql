/*
  Warnings:

  - You are about to drop the column `repoUrl` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `GithubRepo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[githubRepoId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "repoUrl",
ADD COLUMN     "githubRepoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GithubRepo_url_key" ON "GithubRepo"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Project_githubRepoId_key" ON "Project"("githubRepoId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_githubRepoId_fkey" FOREIGN KEY ("githubRepoId") REFERENCES "GithubRepo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
