import { ProductType } from '../../enums/product/product-type.enum';
import { WireCount } from '../../enums/product/product-wire-count.enum';

export interface Product {
  id?: string;
  createdAt?: Date;
  name: string;
  description: string;
  photo: string | null;
  type: ProductType;
  sku: string;
  wireCount: WireCount;
  price: number;
}
