import { Entity, StorableEntity, Order } from '@project/core';

export class OrdersEntity extends Entity implements StorableEntity<Order> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public type!: string;
  public userId!: string;
  public trainingId!: string;
  public trainingPrice!: number;
  public quantity!: number;
  public totalSum!: number;
  public paymentType!: string;

  constructor(order?: Order) {
    super();
    this.populate(order);
  }

  public populate(order?: Order) {
    if (!order) {
      return;
    }

    this.id = order.id;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.type = order.type;
    this.userId = order.userId;
    this.trainingId = order.trainingId;
    this.trainingPrice = order.trainingPrice;
    this.quantity = order.quantity;
    this.totalSum = order.totalSum;
    this.paymentType = order.paymentType;
  }
  public toPOJO(): Order {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      type: this.type,
      userId: this.userId,
      trainingId: this.trainingId,
      trainingPrice: this.trainingPrice,
      quantity: this.quantity,
      totalSum: this.totalSum,
      paymentType: this.paymentType,
    };
  }
}
