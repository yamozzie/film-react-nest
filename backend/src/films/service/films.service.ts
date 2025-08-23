import { Inject, Injectable } from '@nestjs/common';

import { FilmDto } from '../dto/films.dto';
import { FilmsMongoDBRepository } from 'src/repository/FilmsRepository/filmsMongoDB.repository';
import { FilmsPostgreSqlRepository } from 'src/repository/filmsRepository/filmsPostgreSQL.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly FilmsRepository:
      | FilmsMongoDBRepository
      | FilmsPostgreSqlRepository,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.FilmsRepository.findAll();
    return films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken || [],
      })),
    }));
  }

  async findOne(id: string): Promise<FilmDto | null> {
    const film = await this.FilmsRepository.findById(id);
    if (!film) return null;

    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => ({
        id: s.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken || [],
      })),
    };
  }

  async takeSeat(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<boolean> {
    return this.FilmsRepository.updateScheduleSeats(
      filmId,
      scheduleId,
      seatKey,
    );
  }
}
