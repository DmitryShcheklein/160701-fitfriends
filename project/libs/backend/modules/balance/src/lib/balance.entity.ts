import { Balance, StorableEntity, Entity } from '@project/core';

export class BalanceEntity extends Entity implements StorableEntity<Balance> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public userId: string;
  public trainingId: string;

  constructor(data: Balance) {
    super();
    this.populate(data);
  }

  public populate(data: Balance): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;
    this.trainingId = data.trainingId;
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      trainingId: this.trainingId,
    };
  }
}
