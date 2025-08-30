import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmEntity } from '../../films/entities/film.entity';
import { ScheduleEntity } from '../../films/entities/schedule.entity';

@Injectable()
export class FilmsPostgreSqlRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private filmsRepository: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async findAll(): Promise<FilmEntity[]> {
    return await this.filmsRepository.find({ relations: ['schedule'] });
  }

  async findById(id: string): Promise<FilmEntity | undefined> {
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

    schedule.taken = JSON.stringify(schedule.taken);
    await this.scheduleRepository.save(schedule);

    return true;
  }

  async takeSeat(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<boolean> {
    return this.updateScheduleSeats(
      filmId,
      scheduleId,
      seatKey,
    );
  }
}
