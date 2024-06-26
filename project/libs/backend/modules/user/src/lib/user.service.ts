import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUser } from '@project/core';
import { UpdateUserDto } from '@project/dto';
import { FileUploaderService } from '@project/file-uploader';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileUploaderService: FileUploaderService
  ) {}

  public async getUserById(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
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
}
