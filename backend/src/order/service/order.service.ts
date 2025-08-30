import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { FilmsService } from '../../films/service/films.service';
import {
  OrderDto,
  orderResponseDto,
  TicketResponseDto,
} from '../dto/order.dto';
import { FilmsMongoDBRepository } from 'src/repository/filmsRepository/filmsMongoDB.repository';
import { FilmsPostgreSqlRepository } from 'src/repository/filmsRepository/filmsPostgreSQL.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
    | FilmsMongoDBRepository
    | FilmsPostgreSqlRepository
  ) {}

  async createOrder(orderDto: OrderDto): Promise<orderResponseDto> {
    const { tickets } = orderDto;

    const processedTickets: TicketResponseDto[] = [];

    for (const ticket of tickets) {
      const seatKey = `${ticket.row}:${ticket.seat}`;
      const success = await this.filmsRepository.takeSeat(
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
