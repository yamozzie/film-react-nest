import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OrderDto } from '../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() OrderDto: OrderDto) {
    const result = await this.orderService.createOrder(OrderDto);

    return result;
  }
}
