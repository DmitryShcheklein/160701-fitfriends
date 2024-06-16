import { Entity } from '../base';

export interface Repository<T extends Entity> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
