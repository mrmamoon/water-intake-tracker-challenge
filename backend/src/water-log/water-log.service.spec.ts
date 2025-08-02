import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { WaterLogService } from './water-log.service';

describe('WaterLogService', () => {
    let service: WaterLogService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                WaterLogService,
                {
                    provide: PrismaService,
                    useValue: {
                        waterLog: {
                            upsert: jest.fn(),
                        },
                        $queryRaw: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<WaterLogService>(WaterLogService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('upsertLog', () => {
        it('should upsert water log', async () => {
            const mockLog = {
                userId: 'user1',
                date: '2023-01-01',
                intakeMl: 1500,
            };
            jest.spyOn(prisma.waterLog, 'upsert').mockResolvedValue(mockLog as any);

            const result = await service.upsertLog(
                'user1',
                '2023-01-01',
                1500
            );
            expect(result).toEqual(mockLog);
        });
    });
});