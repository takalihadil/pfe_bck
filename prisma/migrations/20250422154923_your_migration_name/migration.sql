/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `post_reactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,commentId]` on the table `post_reactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,messageId]` on the table `post_reactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,messageId]` on the table `read_receipts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('NotStarted', 'InProgress', 'Paused', 'Completed');

-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_userId_fkey";

-- DropIndex
DROP INDEX "post_reactions_userId_postId_commentId_messageId_key";

-- DropIndex
DROP INDEX "read_receipts_messageId_userId_key";

-- AlterTable
ALTER TABLE "habits" ADD COLUMN     "status" "HabitStatus" NOT NULL DEFAULT 'NotStarted',
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "habit_completions" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,

    CONSTRAINT "habit_completions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_reactions_userId_postId_key" ON "post_reactions"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "post_reactions_userId_commentId_key" ON "post_reactions"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "post_reactions_userId_messageId_key" ON "post_reactions"("userId", "messageId");

-- CreateIndex
CREATE UNIQUE INDEX "read_receipts_userId_messageId_key" ON "read_receipts"("userId", "messageId");

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_completions" ADD CONSTRAINT "habit_completions_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
