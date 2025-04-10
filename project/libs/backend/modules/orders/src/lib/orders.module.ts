import { Module } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersFactory } from './orders.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModel, OrdersSchema } from './orders.model';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UserModule } from '@project/user-module';
import { TrainingModule } from '@project/trainings-module';
import { BalanceModule } from '@project/balance-module';

@Module({
  imports: [
    BalanceModule,
    TrainingModule,
    UserModule,
    MongooseModule.forFeature([
      { name: OrdersModel.name, schema: OrdersSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersFactory, OrdersRepository, OrdersService],
  exports: [OrdersRepository],
})
export class OrdersModule {}
