import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film } from 'src/films/schemas/film.schema';

@Injectable()
export class FilmsMongoDBRepository {
  constructor(
    @InjectModel(Film.name) private readonly FilmModel: Model<Film>,
  ) {}

  async findAll() {
    return this.FilmModel.find().lean();
  }

  async findById(id: string) {
    return this.FilmModel.findOne({ id }).lean();
  }

  async updateScheduleSeats(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<boolean> {
    const film = await this.FilmModel.findOne({ id: filmId });

    if (!film) return false;

    const scheduleIndex = film.schedule.findIndex(
      (item) => item.id === scheduleId,
    );

    if (scheduleIndex === -1) return false;

    if (film.schedule[scheduleIndex].taken.includes(seatKey)) {
      return false;
    }

    console.log(`Найден фильм:`, film.title);
    console.log(`Найден сеанс:`, film.schedule[scheduleIndex].id);
    console.log(`Текущие занятые места:`, film.schedule[scheduleIndex].taken);
    console.log(`Проверяем место: ${seatKey}`);
    console.log(
      `Место ${seatKey} ${film.schedule[scheduleIndex].taken.includes(seatKey) ? 'занято' : 'свободно'}`,
    );

    film.schedule[scheduleIndex].taken.push(seatKey);
    await film.save();

    return true;
  }
}
