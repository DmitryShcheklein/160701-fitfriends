import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@project/user-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Hasher, HasherComponent } from '@project/hasher-module';
import { appConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';
import { AuthUser } from '@project/core';
import { UserGender } from '@project/enums';

type MockUser = Partial<AuthUser>;

@Injectable()
export class UsersSeeder implements Seeder {
  private defaultPath!: string;

  constructor(
    @InjectModel(UserModel.name) private readonly user: Model<UserModel>,
    @Inject(HasherComponent.Service)
    private readonly hasherService: Hasher,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {
    this.defaultPath = `http://localhost:${this.config.port}/static/mock/users/avatars`;
  }

  async seed() {
    await this.drop();
    const adminUserData: MockUser = {
      email: 'admin@admin.ru',
      firstName: 'Admin',
      passwordHash: await this.hasherService.generatePasswordHash('adminnew'),
      avatarPath: `${this.defaultPath}/admin-avatar.jpg`,
    };
    const userAdmin = DataFactory.createForClass(UserModel).generate(
      1,
      adminUserData
    );

    const MOCK_USERS_COUNT = 5;
    const MOCK_FEMALE_AVATARS = Array.from({ length: 3 }, (_, idx) => ({
      gender: UserGender.Female,
      path: `${UserGender.Female}/photo-${idx + 1}.png`,
    }));
    const MOCK_MALE_AVATARS = Array.from({ length: 2 }, (_, idx) => ({
      gender: UserGender.Male,
      path: `${UserGender.Male}/photo-${idx + 1}.png`,
    }));
    const MOCK_USERS_AVATARS_PATH = [
      ...MOCK_FEMALE_AVATARS,
      ...MOCK_MALE_AVATARS,
    ].map((obj) => ({ ...obj, path: `${this.defaultPath}/${obj.path}` }));

    const users = DataFactory.createForClass(UserModel).generate(
      MOCK_USERS_COUNT,
      {
        passwordHash: await this.hasherService.generatePasswordHash('123456'),
        avatarPaths: MOCK_USERS_AVATARS_PATH,
        defaultAvatar: `${this.defaultPath}/default-avatar.png`,
      } as MockUser
    );

    return this.user.insertMany([...userAdmin, ...users]);
  }

  async drop() {
    return this.user.deleteMany({});
  }
}
