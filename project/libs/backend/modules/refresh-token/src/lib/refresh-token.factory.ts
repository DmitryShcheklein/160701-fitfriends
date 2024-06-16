import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { EntityFactory, JwtToken } from '@project/core';

@Injectable()
export class RefreshTokenFactory implements EntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: JwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
