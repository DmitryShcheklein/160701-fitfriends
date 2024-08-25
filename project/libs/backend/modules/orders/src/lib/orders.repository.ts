import {OrdersEntity} from "./orders.entity";
import {Injectable} from "@nestjs/common";
import {BaseMongoRepository} from "@project/core";
import {InjectModel} from "@nestjs/mongoose";
import {OrdersModel} from "./orders.model";
import {OrdersFactory} from "./orders.factory";
import { Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends BaseMongoRepository<
  OrdersEntity,
  OrdersModel
> {
  constructor(
    entityFactory: OrdersFactory,
    @InjectModel(OrdersModel.name) OrdersModel: Model<OrdersModel>
  ) {
    super(entityFactory, OrdersModel);
  }
}
