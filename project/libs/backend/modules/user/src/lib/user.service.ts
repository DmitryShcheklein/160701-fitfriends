import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AuthUser,
  FitnessLevel,
  UserGender,
  UserTrainingConfig,
  WorkoutDuration,
  WorkoutType,
} from '@project/core';
import { CreateUserConfigDto, UpdateUserDto } from '@project/dto';
import { FileUploaderService } from '@project/file-uploader';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileUploaderService: FileUploaderService
  ) {}

  public async create(user: AuthUser) {
    const trainingConfig: UserTrainingConfig = {
      level: FitnessLevel.Amateur,
      specialisation: Object.keys(WorkoutType).map((key) => WorkoutType[key]),
      duration: WorkoutDuration.Min10to30,
      caloriesPerDay: user.gender === UserGender.Female ? 2300 : 3300,
      caloriesWantLost: 1000,
      trainingReadiness: false,
    };
    const newUser: AuthUser = {
      ...user,
      trainingConfig,
    };

    const userEntity = new UserEntity(newUser);

    return this.userRepository.save(userEntity);
  }

  public async existUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async getUserById(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return existUser;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return existUser;
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const { avatar } = dto;
    const existUser = await this.getUserById(id);

    let { avatarPath } = existUser;
    if (avatar) {
      avatarPath = (await this.fileUploaderService.saveFile(avatar))?.toPOJO()
        ?.path;
    }

    const user = existUser.toPOJO();
    const updatedUser: AuthUser = {
      ...user,
      ...dto,
      avatarPath,
    };

    const userEntity = new UserEntity(updatedUser);

    return this.userRepository.update(userEntity);
  }

  public async createUserConfig(id: string, dto: CreateUserConfigDto) {
    const existUser = await this.getUserById(id);
    const user = existUser.toPOJO();
    const updatedUser: AuthUser = {
      ...user,
      trainingConfig: dto,
    };
    const userEntity = new UserEntity(updatedUser);

    return this.userRepository.update(userEntity);
  }
}
