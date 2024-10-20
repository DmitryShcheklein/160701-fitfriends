import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@project/core';
import { PaymentVariant } from '@project/enums';
import { OrderValidator, TrainingValidation } from '@project/validation';
import { TrainingRdo } from '../training/training.rdo';

export class OrderRdo implements Omit<Order, 'trainingId'> {
  @Expose()
  @ApiProperty({
    description: 'Уникальный идентификатор тренировки',
    example: 'df1912151f3c407d96b2390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    type: Date,
    description: 'Дата создания тренировки',
    example: '2024-01-09T14:55:34.697Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    enum: PaymentVariant,
    description: 'Вариант оплаты',
    example: PaymentVariant.Mir,
  })
  public paymentType!: PaymentVariant;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Общая сумма заказа',
    example: 1000,
  })
  public totalSum!: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Общая сумма заказа',
    example: OrderValidator.Quantity.Min,
  })
  public quantity!: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Цена тренировки на момент заказа',
    example: TrainingValidation.Price.Min,
  })
  public trainingPrice!: number;

  @Expose({ name: 'trainingId' })
  @ApiProperty({
    type: TrainingRdo,
    description: 'Тренировка',
  })
  public training!: TrainingRdo;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Id юзера',
  })
  public userId!: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Вид покупки',
  })
  public type!: string;
}
