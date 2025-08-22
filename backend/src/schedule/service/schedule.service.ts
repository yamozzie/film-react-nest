import { Injectable } from '@nestjs/common';
import { ScheduleDto } from '../dto/schedule.dto';

@Injectable()
export class ScheduleService {
  private schedules: ScheduleDto[] = [];

  create(schedule: ScheduleDto) {
    this.schedules.push(schedule);

    return schedule;
  }

  findAll() {
    return this.schedules;
  }
}
