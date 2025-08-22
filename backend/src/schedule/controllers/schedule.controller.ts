import { Body, Controller, Post, Get } from '@nestjs/common';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleDto } from '../dto/schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() scheduleDto: ScheduleDto) {
    return this.scheduleService.create(scheduleDto);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }
}
