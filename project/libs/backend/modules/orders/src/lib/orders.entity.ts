import {Entity, StorableEntity, Order } from "@project/core";

export class OrdersEntity extends Entity implements StorableEntity<Order> {
  constructor(order?: Order) {
    super();
    this.populate(order);
  }

  public populate(order?: Order) {
    if (!order) {
      return;
    }
  }
  public toPOJO(): any {}
}
