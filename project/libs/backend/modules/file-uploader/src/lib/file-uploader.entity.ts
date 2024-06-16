import { Entity, StorableEntity } from '@project/core';
import { File } from '@project/core';

export class FileEntity extends Entity implements StorableEntity<File> {
  public originalName!: string;
  public size!: number;
  public mimetype!: string;
  public hashName!: string;
  public path!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public subDirectory!: string;

  constructor(file?: File) {
    super();
    this.populate(file);
  }

  public populate(file?: File) {
    if (!file) {
      return;
    }
    this.id = file.id;
    this.originalName = file.originalName;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.subDirectory = file.subDirectory;
    this.path = file.path;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }

  public toPOJO() {
    return {
      ...this,
      id: this.id,
    };
  }
}
