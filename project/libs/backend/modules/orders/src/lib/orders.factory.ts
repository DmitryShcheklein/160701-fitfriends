import {Injectable} from "@nestjs/common";
import {EntityFactory, Order} from "@project/core";
import {OrdersEntity} from "./orders.entity";


@Injectable()
export class OrdersFactory implements EntityFactory<OrdersEntity> {
  public create(entityPlainData: Order): OrdersEntity {
    return new OrdersEntity(entityPlainData);
  }
}
