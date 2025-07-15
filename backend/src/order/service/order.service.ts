import { BadRequestException, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { FilmsService } from 'src/films/service/films.service';
import {
  OrderDto,
  orderResponseDto,
  TicketResponseDto,
} from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsService: FilmsService) {}

  async createOrder(orderDto: OrderDto): Promise<orderResponseDto> {
    const { tickets } = orderDto;

    const processedTickets: TicketResponseDto[] = [];

    for (const ticket of tickets) {
      const seatKey = `${ticket.row}:${ticket.seat}`;
      const success = await this.filmsService.takeSeat(
        ticket.film,
        ticket.session,
        seatKey,
      );

      if (!success) {
        throw new BadRequestException(`Место уже занято`);
      }

      processedTickets.push({
        ...ticket,
        id: faker.string.uuid(),
      });
    }

    return {
      total: processedTickets.length,
      items: processedTickets,
    };
  }
}
