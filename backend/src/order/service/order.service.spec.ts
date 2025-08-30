import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { BadRequestException } from '@nestjs/common';
import { FilmsPostgreSqlRepository } from 'src/repository/filmsRepository/filmsPostgreSQL.repository';
import { OrderDto, TicketDto } from '../dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let filmsRepository: FilmsPostgreSqlRepository;

  const mockTickets: TicketDto = {
    film: 'film1',
    session: 'test-id',
    daytime: '2025-01-01',
    row: 2,
    seat: 3,
    price: 850
  };

  const mockOrderData: OrderDto = {
    tickets: [mockTickets],
    email: 'test@example.com',
    phone: '+79001234567'
  };

  const mockRepository = {
    takeSeat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'FILMS_REPOSITORY',
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    filmsRepository = module.get<FilmsPostgreSqlRepository>('FILMS_REPOSITORY');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order when seats are available', async () => {
    mockRepository.takeSeat.mockResolvedValue(true);

    const response = await service.createOrder(mockOrderData);

    expect(mockRepository.takeSeat).toHaveBeenCalledWith(
      mockTickets.film,
      mockTickets.session,
      `${mockTickets.row}:${mockTickets.seat}`
    );
    expect(response.total).toBe(1);
    expect(response.items[0]).toMatchObject({
      ...mockTickets,
    });
    expect(response.items[0].id).toBeDefined();
  });

  it('should throw BadRequestException if seat is taken', async () => {
    mockRepository.takeSeat.mockResolvedValue(false);

    await expect(service.createOrder(mockOrderData)).rejects.toThrow(BadRequestException);
    expect(mockRepository.takeSeat).toHaveBeenCalled();
  });

  it('should handle multiple tickets', async () => {
    mockRepository.takeSeat.mockResolvedValue(true);
    const multiOrder: OrderDto = {
      ...mockOrderData,
      tickets: [
        mockTickets,
        { ...mockTickets, row: 3, seat: 4, price: 900 }
      ]
    };

    const response = await service.createOrder(multiOrder);

    expect(response.total).toBe(2);
    expect(response.items.length).toBe(2);
    response.items.forEach(item => {
      expect(item.id).toBeDefined();
    });
  });
});