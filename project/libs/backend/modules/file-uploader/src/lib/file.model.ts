import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File } from '@project/core';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class FileModel extends Document implements File {
  @Prop({
    required: true,
  })
  public originalName!: string;

  @Prop({
    required: true,
  })
  public hashName!: string;

  @Prop({
    required: true,
  })
  public subDirectory!: string;

  @Prop({
    required: true,
  })
  public mimetype!: string;

  @Prop({
    required: true,
  })
  public path!: string;

  @Prop({
    required: true,
  })
  public size!: number;

  public id?: string;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
