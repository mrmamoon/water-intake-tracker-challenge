import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WaterLogService {
    constructor(private prisma: PrismaService) { }

    async upsertLog(userId: string, date: string, intakeMl: number) {
        return this.prisma.waterLog.upsert({
            where: { userId_date: { userId, date: new Date(date) } },
            update: { intakeMl },
            create: { userId, date: new Date(date), intakeMl }
        });
    }

    async getWeeklySummary(userId: string): Promise<any[]> {
        return this.prisma.$queryRaw`
      WITH dates AS (
        SELECT DATE('now', '-' || value || ' days') AS date
        FROM generate_series(0,6,1)
      )
      SELECT
        STRFTIME('%Y-%m-%d', dates.date) AS date,
        COALESCE(wl.intakeMl, 0) AS totalIntake,
        ROUND(COALESCE(wl.intakeMl, 0) * 100.0 / 2000, 0) AS percentageOfGoal
      FROM dates
      LEFT JOIN WaterLog wl ON 
        DATE(wl.date) = dates.date AND 
        wl.userId = ${userId}
      ORDER BY dates.date DESC
    `;
    }
}