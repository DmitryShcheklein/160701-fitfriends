import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenFactory } from './refresh-token.factory';
import { BaseMongoRepository } from '@project/core';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    entityFactory: RefreshTokenFactory,
    @InjectModel(RefreshTokenModel.name) blogUserModel: Model<RefreshTokenModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(
    tokenId: string
  ): Promise<RefreshTokenEntity | null> {
    const document = await this.model.findOne({ tokenId }).exec();

    if (!document) return null;

    return this.createEntityFromDocument(document);
  }

  public async deleteExpiredTokens() {
    return this.model.deleteMany({ expiresIn: { $lt: new Date() } }).exec();
  }
}
