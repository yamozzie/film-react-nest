import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsPostgreSqlRepository } from '../../repository/filmsRepository/filmsPostgreSQL.repository';
import { FilmDto, ScheduleDto } from '../dto/films.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmsRepository: FilmsPostgreSqlRepository;

  const mockSchedule: ScheduleDto = {
    id: 'sch1',
    daytime: '2023-10-10T10:00:00Z',
    hall: 3,
    rows: 10,
    seats: 100,
    price: 500,
    taken: [],
  };

  const mockFilm: FilmDto = {
    id: 'film1',
    rating: 9,
    director: 'Test Director',
    tags: ['test', 'comedy'],
    image: 'url',
    cover: 'coverUrl',
    title: 'Test Film',
    about: 'About film',
    description: 'Description',
    schedule: [mockSchedule],
  };

  const takenSeats: string[] = [];

  beforeEach(async () => {
    filmsRepository = {
      findAll: jest.fn().mockResolvedValue([mockFilm]),
      findById: jest.fn().mockResolvedValue(mockFilm),
      updateScheduleSeats: jest.fn(
        (filmId: string, scheduleId: string, seatKey: string) => {
          if (filmId !== mockFilm.id) return Promise.resolve(false);

          const schedule = mockFilm.schedule.find((s) => s.id === scheduleId);
          if (!schedule) return Promise.resolve(false);

          if (takenSeats.includes(seatKey)) return Promise.resolve(false);

          takenSeats.push(seatKey);
          return Promise.resolve(true);
        },
      ),
    } as unknown as FilmsPostgreSqlRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService,
        { provide: 'FILMS_REPOSITORY', useValue: filmsRepository }
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  describe('.findAll() tests', () => {
    it('Should return all films', async () => {
      const films = await service.findAll();
      expect(films).toEqual([mockFilm])
    })
  })

  describe('.findById() tests', () => {
    it('Should return film by id', async () => {
      const film = await service.findOne('film1')
      expect(film).toEqual(mockFilm)
    })
    it('should return null if film is not found', async () => {
      const film = await service.findOne('film2')
      expect(film).toBeNull
    })
  })

  describe('.updateScheduleSeats() tests', () => {
    it('should update schedule seats and return true if seat is free', async () => {
      const result = await filmsRepository.updateScheduleSeats(
        'film1',
        'sch1',
        'A1',
      );
      expect(result).toBe(true);
    });

    it('should return false if seat is already taken', async () => {
      await filmsRepository.updateScheduleSeats('film1', 'sch1', 'A1');
      const result = await filmsRepository.updateScheduleSeats(
        'film1',
        'sch1',
        'A1',
      );
      expect(result).toBe(false);
    });

    it('should return false if schedule not found', async () => {
      const result = await filmsRepository.updateScheduleSeats(
        'film1',
        'no-sch',
        'A2',
      );
      expect(result).toBe(false);
    });

    it('should return false if film not found', async () => {
      const result = await filmsRepository.updateScheduleSeats(
        'no-film',
        'sch1',
        'A2',
      );
      expect(result).toBe(false);
    });
  });
});
