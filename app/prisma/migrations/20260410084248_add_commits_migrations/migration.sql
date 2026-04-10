-- CreateTable
CREATE TABLE "GithubCommit" (
    "id" TEXT NOT NULL,
    "sha" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubCommit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubCommit_sha_key" ON "GithubCommit"("sha");

-- CreateIndex
CREATE INDEX "GithubCommit_repoId_date_idx" ON "GithubCommit"("repoId", "date" DESC);

-- AddForeignKey
ALTER TABLE "GithubCommit" ADD CONSTRAINT "GithubCommit_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "GithubRepo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
