import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Film } from 'src/films/entities/film.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Injectable()
export class filmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return await this.filmsRepository.find({ relations: ['schedule'] });
  }

  async findById(id: string): Promise<Film | undefined> {
    return await this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async updateScheduleSeats(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<boolean> {
    const film = await this.filmsRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    if (!film) return false;

    const schedule = film.schedule.find((item) => item.id === scheduleId);

    if (!schedule) return false;

    if (schedule.taken.includes(seatKey)) {
      return false;
    }

    schedule.taken.push(seatKey);
    await this.scheduleRepository.save(schedule);

    return true;
  }
}
