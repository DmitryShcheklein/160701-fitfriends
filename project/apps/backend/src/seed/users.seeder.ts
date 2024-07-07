import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@project/user-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Hasher, HasherComponent } from '@project/hasher-module';
import { appConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';
import { AuthUser } from '@project/core';

type MockUser = Partial<AuthUser>;

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(UserModel.name) private readonly user: Model<UserModel>,
    @Inject(HasherComponent.Service)
    private readonly hasherService: Hasher,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async seed() {
    const adminUserData: MockUser = {
      email: 'admin@admin.ru',
      firstName: 'Admin',
      passwordHash: await this.hasherService.generatePasswordHash('adminnew'),
      avatarPath: `http://localhost:${this.config.port}/static/mock/default-avatar.jpg`,
    };
    const userAdmin = DataFactory.createForClass(UserModel).generate(
      1,
      adminUserData
    );

    const MOCK_USERS_COUNT = 10;

    const users = DataFactory.createForClass(UserModel).generate(
      MOCK_USERS_COUNT,
      {
        passwordHash: await this.hasherService.generatePasswordHash('123456'),
      }
    );

    return this.user.insertMany([...userAdmin, ...users]);
  }

  async drop() {
    return this.user.deleteMany({});
  }
}
