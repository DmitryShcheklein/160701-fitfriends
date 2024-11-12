import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@project/user-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Hasher, HasherComponent } from '@project/hasher-module';
import { appConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';
import { AuthUser, UsersSeederData } from '@project/core';
import { UserGender } from '@project/enums';
import { AdminUser, DEFAULT_AVATAR_FILE_NAME, User } from './seed.const';

@Injectable()
export class UsersSeeder implements Seeder {
  private defaultPath!: string;
  private MOCK_USERS_COUNT = 5;

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

    const adminUserMock: Partial<AuthUser> = {
      email: AdminUser.email,
      firstName: AdminUser.firstName,
      passwordHash: await this.hasherService.generatePasswordHash(
        AdminUser.password
      ),
      avatarPath: `${this.defaultPath}/${AdminUser.avatarFileName}`,
    };
    const userAdmin = DataFactory.createForClass(UserModel).generate(
      1,
      adminUserMock
    );

    const MOCK_FEMALE_AVATARS = Array.from(Array(3), (_, idx) => ({
      gender: UserGender.Female,
      path: `${UserGender.Female}/photo-${idx + 1}.png`,
    }));
    const MOCK_MALE_AVATARS = Array.from(Array(2), (_, idx) => ({
      gender: UserGender.Male,
      path: `${UserGender.Male}/photo-${idx + 1}.png`,
    }));
    const MOCK_USERS_AVATARS_PATH = [
      ...MOCK_FEMALE_AVATARS,
      ...MOCK_MALE_AVATARS,
    ].map((obj) => ({ ...obj, path: `${this.defaultPath}/${obj.path}` }));

    const mockData: UsersSeederData = {
      passwordHash: await this.hasherService.generatePasswordHash(
        User.password
      ),
      avatarPaths: MOCK_USERS_AVATARS_PATH,
      defaultAvatar: `${this.defaultPath}/${DEFAULT_AVATAR_FILE_NAME}`,
    };

    const users = DataFactory.createForClass(UserModel).generate(
      this.MOCK_USERS_COUNT,
      mockData
    );

    return this.user.insertMany([...userAdmin, ...users]);
  }

  async drop() {
    return this.user.deleteMany({});
  }
}
