import { DataFactory, Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { BalanceModel } from '@project/balance-module';
import { Model } from 'mongoose';
import { OrdersModel } from '@project/orders-module';
import { Balance, Order } from '@project/core';

export class BalanceSeeder implements Seeder {
  constructor(
    @InjectModel(BalanceModel.name)
    private readonly balanceModel: Model<Balance>,
    @InjectModel(OrdersModel.name)
    private readonly orderModel: Model<OrdersModel>
  ) {}

  async seed() {
    await this.drop();

    const orders: Order[] = (await this.orderModel.find()).map(
      (order) => order
    );
    const balances = orders.map((order) => {
      const { quantity, userId, trainingId, id: orderId } = order;
      const mockData: Balance = {
        userId,
        trainingId,
        orderId,
      };

      return DataFactory.createForClass(BalanceModel).generate(
        quantity,
        mockData
      );
    });

    return this.balanceModel.insertMany(balances.flat());
  }

  async drop() {
    return this.balanceModel.deleteMany({});
  }
}
