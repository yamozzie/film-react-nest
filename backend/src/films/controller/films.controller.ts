import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { FilmsService } from '../service/films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    const films = await this.filmsService.findAll();

    return {
      total: films.length,
      items: films
    };
  }

  @Get(':id/schedule')
  async findOne(@Param('id') id: string) {
    const film = await this.filmsService.findOne(id);

    if (!film) {
      throw new NotFoundException(`Фильм с id: ${id} не найден`);
    }

    return {
      total: film.schedule.length,
      items: film.schedule
    };
  }
}
