import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';

@Controller('water')
export class WaterLogController {
    constructor(private readonly waterLogService: WaterLogService) { }

    @Post('log')
    async createLog(
        @Body() body: { userId: string; date: string; intakeMl: number }
    ) {
        return this.waterLogService.upsertLog(
            body.userId,
            body.date,
            body.intakeMl
        );
    }

    @Get('summary/:userId')
    async getSummary(@Param('userId') userId: string) {
        return this.waterLogService.getWeeklySummary(userId);
    }
}