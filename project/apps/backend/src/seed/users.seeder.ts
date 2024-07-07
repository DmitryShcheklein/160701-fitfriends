import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '@project/user-module';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Hasher, HasherComponent } from '@project/hasher-module';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(UserModel.name) private readonly user: Model<UserModel>,
    @Inject(HasherComponent.Service)
    private readonly hasherService: Hasher
  ) {}

  async seed(): Promise<any> {
    const userAdmin = DataFactory.createForClass(UserModel).generate(1, {
      email: 'admin777@admin.ru',
      firstName: 'Admin',
      passwordHash: await this.hasherService.generatePasswordHash('adminnew'),
    });
    const users = DataFactory.createForClass(UserModel).generate(0);

    return this.user.insertMany([...userAdmin, ...users]);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
