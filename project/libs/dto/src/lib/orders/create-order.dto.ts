import { PaymentVariant } from '@project/enums';
import { OrderValidator } from '@project/validation';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    description: 'Training id',
    example: '',
  })
  @IsMongoId()
  public trainingId: string;

  @ApiProperty({
    required: true,
    description: 'Quantity position',
    example: OrderValidator.Quantity.Min,
    minimum: OrderValidator.Quantity.Min,
    maximum: OrderValidator.Quantity.Max,
  })
  @IsNumber()
  @Min(OrderValidator.Quantity.Min)
  @Max(OrderValidator.Quantity.Max)
  public quantity!: number;

  @ApiProperty({
    required: true,
    description: 'PaymentType',
    example: PaymentVariant.Mir,
    enum: PaymentVariant,
  })
  @IsEnum(PaymentVariant)
  public paymentType!: PaymentVariant;
}
