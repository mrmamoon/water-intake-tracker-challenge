import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { WaterLogService } from './water-log/water-log.service';
import { WaterLogController } from './water-log/water-log.controller';

@Module({
  controllers: [WaterLogController],
  providers: [PrismaService, WaterLogService],
})
export class AppModule { }