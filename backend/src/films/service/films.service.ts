import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filmsRepository } from 'src/repository/films.repository';
import { FilmDto } from '../dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: filmsRepository) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmsRepository.findAll();
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
    const film = await this.filmsRepository.findById(id);
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
    return this.filmsRepository.updateScheduleSeats(
      filmId,
      scheduleId,
      seatKey,
    );
  }
}
