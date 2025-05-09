import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserQuestionnaireController } from './user-questionnaire.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UserController, UserQuestionnaireController],
  providers: [UserFactory, UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
