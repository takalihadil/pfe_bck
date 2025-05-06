-- AlterEnum
ALTER TYPE "MessageStatus" ADD VALUE 'DELIVERED';

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "deletedForEveryone" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "read_receipts" ALTER COLUMN "readAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "message_deletes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_deletes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "message_deletes_userId_messageId_key" ON "message_deletes"("userId", "messageId");

-- AddForeignKey
ALTER TABLE "message_deletes" ADD CONSTRAINT "message_deletes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_deletes" ADD CONSTRAINT "message_deletes_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
