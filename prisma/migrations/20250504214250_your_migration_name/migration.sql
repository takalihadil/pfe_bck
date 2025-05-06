-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'HabitReminder';

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "habit_id" TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
