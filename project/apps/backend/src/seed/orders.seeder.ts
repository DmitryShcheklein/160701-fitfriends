import { InjectModel } from '@nestjs/mongoose';
import { TrainingModel } from '@project/trainings-module';
import { Model } from 'mongoose';
import { UserModel } from '@project/user-module';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { OrdersModel } from '@project/orders-module';
import { Injectable } from '@nestjs/common';
import { PaymentVariant } from '@project/enums';
import { OrderSeederData } from '@project/core';

@Injectable()
export class OrdersSeeder implements Seeder {
  constructor(
    @InjectModel(TrainingModel.name)
    private readonly trainingModel: Model<TrainingModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(OrdersModel.name)
    private readonly orderModel: Model<OrdersModel>
  ) {}

  async seed() {
    await this.drop();

    const userIds = (await this.userModel.find().select('_id')).map((user) =>
      user._id.toString()
    );

    const [training] = (await this.trainingModel.find()).map(
      (training) => training
    );

    const orders = userIds.map((userId) => {
      const QUANTITY = 2;
      const mockData: OrderSeederData = {
        userId,
        training: training,
        quantity: QUANTITY,
        trainingPrice: training.price,
        totalSum: training.price * QUANTITY,
        paymentType: PaymentVariant.Visa,
        type: 'абонемент',
      };
      const [mockOrder] = DataFactory.createForClass(OrdersModel).generate(
        1,
        mockData
      );

      return mockOrder;
    });

    return this.orderModel.insertMany(orders);
  }

  async drop() {
    return this.orderModel.deleteMany({});
  }
}
