// src/scheduler/scheduler.service.ts
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { WeeklySummaryService } from '../habit/weekly-summary.service';
import { AuthService } from '../users/users.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly weeklySummaryService: WeeklySummaryService,
    private readonly authService: AuthService, // ← here
    private readonly notificationService: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  async handleWeeklySummary() {
    const users = await this.authService.getUsers();

    for (const user of users) {
      const summary = await this.weeklySummaryService.generateWeeklySummary(user.id);

      await this.notificationService.sendToUser(user.id, {
        title: '🧠 Résumé Hebdomadaire',
        message: summary,
      });
    }
  }
}
