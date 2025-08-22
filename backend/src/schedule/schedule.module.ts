import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ScheduleService } from './service/schedule.service';
import { ScheduleController } from './controllers/schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
