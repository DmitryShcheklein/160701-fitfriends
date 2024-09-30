import {
  Balance,
  StorableEntity,
  Entity,
  AvailableTraining,
} from '@project/core';

export class BalanceEntity extends Entity implements StorableEntity<Balance> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public userId: string;
  public orderId: string;
  public trainingId: string;
  public isActive: boolean;

  public availableTrainings: AvailableTraining[];

  constructor(data: Balance) {
    super();
    this.populate(data);
  }

  public populate(data: Balance): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;
    this.orderId = data.orderId;
    this.trainingId = data.trainingId;
    this.isActive = data.isActive;
    this.availableTrainings = data.availableTrainings;
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      orderId: this.orderId,
      trainingId: this.trainingId,
      isActive: this.isActive,
      availableTrainings: this.availableTrainings,
    };
  }
}
