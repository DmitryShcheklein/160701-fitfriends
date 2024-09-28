import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RequestWithTokenPayload } from '@project/core';
import { AuthKeyName } from '@project/config';
import { CreateOrderDto } from '@project/dto';
import { OrdersService } from './orders.service';
import { fillDto } from '@project/backend-helpers';
import { OrderRdo } from '@project/rdo';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(AuthKeyName)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({
    type: OrderRdo,
    description: 'Order created',
  })
  @ApiOperation({
    summary: 'Создать заказ',
    description: 'Create order',
  })
  @Post()
  public async create(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: CreateOrderDto
  ) {
    const userId = user.sub;
    const newOrder = await this.ordersService.create(dto, userId);

    return fillDto(OrderRdo, newOrder.toPOJO());
  }
}
