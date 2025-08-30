//TODO описать DTO для запросов к /films

import { Schedule } from '../schemas/film.schema';

export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: Schedule[];
}

export class ScheduleDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
