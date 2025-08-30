import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
          items: [
            {
              film: 'filmId',
              session: 'sessionId',
              daytime: '2025-01-01',
              row: 1,
              seat: 1,
              price: 850,
            },
          ],
          total: 1,
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  describe('.createOrder() tests', () => {
    it('should be call OrderService.createOrder() and return the result', async () => {
      const mockOrder: OrderDto = {
        tickets: [
          {
            film: 'filmId',
            session: 'sessionId',
            daytime: '2025-01-01',
            row: 1,
            seat: 1,
            price: 850,
          },
        ],
        email: 'test@example.com',
        phone: '+79001234567',
      };
      const orderComplete = await controller.createOrder(mockOrder);

      const result = {
        items: mockOrder.tickets,
        total: mockOrder.tickets.length,
      };

      expect(orderComplete).toEqual(result);
      expect(service.createOrder).toHaveBeenCalledWith(mockOrder);
    });
  });
});
