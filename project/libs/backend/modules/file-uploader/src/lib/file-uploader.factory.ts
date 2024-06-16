import { Injectable } from '@nestjs/common';

import { File, EntityFactory } from '@project/core';
import { FileEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileEntity> {
  public create(entityPlainData: File): FileEntity {
    return new FileEntity(entityPlainData);
  }
}
