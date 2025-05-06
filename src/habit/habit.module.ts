
import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
 import { PrismaService } from '../prisma.service'; 
import { HabitController } from './habit.controller';
import { WeeklySummaryService } from './weekly-summary.service';
@Module({
  // Import PrismaModule here
  controllers: [HabitController],
  providers: [HabitService ,WeeklySummaryService,PrismaService],
  exports: [HabitService ,WeeklySummaryService],
})
export class HabitModule {}