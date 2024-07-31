import { Product } from 'src/app/pages/products/models/product.model';

export class LoadProducts {
  static readonly type = '[Products] Load Products';
}

export class AddProduct {
  static readonly type = '[Products] Add Product';
  constructor(public product: Product) {}
}

export class UpdateProduct {
  static readonly type = '[Products] Update Product';
  constructor(public product: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Products] Delete Product';
  constructor(public id: number) {}
}
