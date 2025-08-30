import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../controller/films.controller';
import { FilmsService } from '../service/films.service';
import { FilmDto, ScheduleDto } from '../dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockSchedule: ScheduleDto = {
    id: 'id2',
    daytime: '2023-10-10T10:00:00Z',
    hall: 5,
    rows: 6,
    seats: 2,
    price: 700,
    taken: [],
  };

  const mockFilm: FilmDto = {
    id: 'id',
    rating: 8.5,
    director: 'Director',
    tags: ['tag-1'],
    image: 'http://example.com/image.jpg',
    cover: 'http://example.com/image.jpg',
    title: 'Film Title',
    about: 'Film About',
    description: 'Film Description',
    schedule: [mockSchedule],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([mockFilm]),
        findOne: jest.fn().mockResolvedValue(mockFilm),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('.findAll() tests', () => {
    it('Should return all films', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual({
        items: [mockFilm],
        total: 1,
      });
    });
  });

  describe('.findOne() tests', () => {
    it('Should return schedule for one film', async () => {
      const result = await controller.findOne('id');

      expect(result.total).toBe(mockFilm.schedule.length);
      expect(result.items).toEqual(mockFilm.schedule);
    });
  });
});
