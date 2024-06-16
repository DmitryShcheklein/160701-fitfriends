import { Document, Model, UpdateQuery } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { Repository } from './repository.interface';
import { EntityFactory, StorableEntity } from '../interfaces';
import { Entity } from '../base';

export abstract class BaseMongoRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document
> implements Repository<T>
{
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) {}

  protected createEntityFromDocument(document: DocumentType): T {
    const plainObject = document.toObject({
      getters: true,
      versionKey: false,
      flattenObjectIds: true,
    }) as ReturnType<T['toPOJO']>;

    return this.entityFactory.create(plainObject);
  }

  public async findById(id: T['id']): Promise<T> {
    const document = await this.model.findById(id).exec();

    if (!document) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async save(entity: T): Promise<T> {
    const newDocument = new this.model(entity.toPOJO());
    const document = await newDocument.save();
    const newEntity = this.createEntityFromDocument(document as DocumentType);
    if (!newEntity) {
      throw new NotFoundException('Document not save');
    }

    return newEntity;
  }

  public async update(entity: T): Promise<T> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(
        entity.id,
        entity.toPOJO() as UpdateQuery<DocumentType>,
        {
          new: true,
          runValidators: true,
        }
      )
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Entity with id ${entity.id} not found`);
    }

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }
  }
}
