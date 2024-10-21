import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  JwtAuthGuard,
  RequestWithTokenPayload,
  OrdersQuery,
} from '@project/core';
import { AuthKeyName } from '@project/config';
import { CreateOrderDto } from '@project/dto';
import { OrdersService } from './orders.service';
import { fillDto } from '@project/backend-helpers';
import { OrderRdo, OrdersWithPaginationRdo } from '@project/rdo';

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

  @ApiOkResponse({
    isArray: true,
    type: OrderRdo,
    description: 'Orders by user',
  })
  @ApiOperation({
    summary: 'Получить заказы пользователя',
    description: 'Get user orders',
  })
  @Get()
  public async findAllByUserId(
    @Req() { user }: RequestWithTokenPayload,
    @Query() query: OrdersQuery
  ) {
    const userId = user.sub;
    const ordersWithPagination = await this.ordersService.findByUserId(
      userId,
      query
    );
    const result = {
      ...ordersWithPagination,
      entities: ordersWithPagination.entities.map((training) =>
        training.toPOJO()
      ),
    };

    return fillDto(OrdersWithPaginationRdo, result);
  }
}
