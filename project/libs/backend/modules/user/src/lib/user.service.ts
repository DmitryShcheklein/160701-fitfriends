import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUser, UserTrainingConfig } from '@project/core';
import { UpdateUserConfigDto, UpdateUserDto } from '@project/dto';
import { FileUploaderService } from '@project/file-uploader';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import {
  FitnessLevel,
  WorkoutType,
  WorkoutDuration,
  UserGender,
} from '@project/enums';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileUploaderService: FileUploaderService
  ) {}

  public async create(user: AuthUser) {
    const newUser: AuthUser = {
      ...user,
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

    if (avatar === null) {
      avatarPath = null;
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

  public async updateUserConfig(id: string, dto: UpdateUserConfigDto) {
    const existUser = await this.getUserById(id);
    const user = existUser.toPOJO();
    const updatedUser: AuthUser = {
      ...user,
      trainingConfig: { ...user.trainingConfig, ...dto },
    };
    const userEntity = new UserEntity(updatedUser);

    return this.userRepository.update(userEntity);
  }
}
