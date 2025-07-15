import { Controller, Get, HttpStatus, NotFoundException, Param } from '@nestjs/common';

import { FilmsService } from '../service/films.service';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    async findAll() {
        const films = await this.filmsService.findAll()

        return {
            status: HttpStatus.OK,
            data: films
        }
    }

    @Get(':id/schedule')
    async findOne(@Param('id') id: string) {
        const film = await this.filmsService.findOne(id)

        if (!film) {
            throw new NotFoundException(`Фильм с id: ${id} не найден`)
        }

        return {
            status: HttpStatus.OK,
            data: film
        }
    }
}