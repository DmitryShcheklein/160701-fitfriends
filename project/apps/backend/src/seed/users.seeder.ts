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
import { AdminUser, User, RandomUser, TrainerUser } from './seed.const';

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

    // Admin
    const userAdmin = await this.generateAdminUser();
    // Trainer
    const trainerUser = await this.generateTrainerUser();
    // MyUser
    const myUser = await this.generateUser();
    // Random Users
    const users = await this.generateRandomUsers();

    return this.user.insertMany([userAdmin, trainerUser, myUser, users].flat());
  }

  async drop() {
    return this.user.deleteMany({});
  }

  private async generateAdminUser() {
    const { email, firstName, role, avatarFileName, password } = AdminUser;
    const adminUserMock: Partial<AuthUser> = {
      email,
      firstName,
      role,
      passwordHash: await this.hasherService.generatePasswordHash(password),
      avatarPath: `${this.defaultPath}/${avatarFileName}`,
    };

    return DataFactory.createForClass(UserModel).generate(1, adminUserMock);
  }

  private async generateTrainerUser() {
    const { email, firstName, role, avatarFileName, password } = TrainerUser;

    const trainerUserMock: Partial<AuthUser> = {
      email,
      firstName,
      role,
      passwordHash: await this.hasherService.generatePasswordHash(password),
      avatarPath: `${this.defaultPath}/${avatarFileName}`,
    };

    return DataFactory.createForClass(UserModel).generate(1, trainerUserMock);
  }

  private async generateUser() {
    const { email, firstName, role, avatarFileName, password } = User;
    const trainerUserMock: Partial<AuthUser> = {
      email,
      firstName,
      role,
      passwordHash: await this.hasherService.generatePasswordHash(password),
      avatarPath: `${this.defaultPath}/${avatarFileName}`,
    };

    return DataFactory.createForClass(UserModel).generate(1, trainerUserMock);
  }

  private async generateRandomUsers() {
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

    const { password, avatarFileName } = RandomUser;
    const mockData: UsersSeederData = {
      passwordHash: await this.hasherService.generatePasswordHash(password),
      avatarPaths: MOCK_USERS_AVATARS_PATH,
      defaultAvatar: `${this.defaultPath}/${avatarFileName}`,
    };

    return DataFactory.createForClass(UserModel).generate(
      this.MOCK_USERS_COUNT,
      mockData
    );
  }
}
