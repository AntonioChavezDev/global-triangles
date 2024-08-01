import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  LoadProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from './products.actions';
import { delay, of } from 'rxjs';
import { BaseStateModel } from '../models/base-state.model';
import { Product } from 'src/app/pages/products/models/product.model';

export interface ProductsStateModel extends BaseStateModel {
  products: Product[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    loading: false,
    error: '',
  },
})
@Injectable()
export class ProductsState {
  @Selector()
  static products(state: ProductsStateModel): Product[] {
    return state && state.products ? state.products : [];
  }

  @Selector()
  static loading(state: ProductsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: ProductsStateModel): string | null {
    return state.error;
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({ loading: true });

    of([])
      .pipe(delay(2000))
      .subscribe({
        next: (products: Product[]) => {
          products = [];
          for (let i = 1; i <= 5; i++) {
            products.push({
              id: i,
              price: i * 100,
              description: `Product Description ${i}`,
              category: {
                id: i,
                name: `Category Name ${i}`,
              },
            });
          }
          ctx.patchState({ products });
        },
        error: (err) => {
          ctx.patchState({
            loading: false,
            error: 'Error trying to get products.',
          });
        },
        complete: () => {
          ctx.patchState({ loading: false });
        },
      });
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductsStateModel>, action: AddProduct) {
    const state = ctx.getState();
    const product = action.product;
    product.id = state?.products?.length + 1 || 1;

    ctx.patchState({
      products: [...state.products, product],
    });
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductsStateModel>, action: UpdateProduct) {
    const state = ctx.getState();
    const products = state.products.map((product) =>
      product.id === action.product.id ? action.product : product
    );
    ctx.patchState({ products: products });
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductsStateModel>, action: DeleteProduct) {
    const state = ctx.getState();
    const products = state.products.filter(
      (product) => product.id !== action.id
    );
    ctx.patchState({ products });
  }
}
