import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { BaseStateModel } from '../models/base-state.model';
import { Category } from 'src/app/pages/categories/models/category.model';
import {
  AddCategory,
  DeleteCategory,
  LoadCategories,
  UpdateCategory,
} from './categories.actions';

export interface CategoriesStateModel extends BaseStateModel {
  categories: Category[];
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    loading: false,
    error: '',
  },
})
@Injectable()
export class CategoriesState {
  @Selector()
  static categories(state: CategoriesStateModel): Category[] {
    return state && state.categories ? state.categories : [];
  }

  @Selector()
  static loading(state: CategoriesStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: CategoriesStateModel): string | null {
    return state.error;
  }

  @Action(LoadCategories)
  loadCategories(ctx: StateContext<CategoriesStateModel>) {
    ctx.patchState({ loading: true });

    of([])
      .pipe(delay(2000))
      .subscribe({
        next: (categories: Category[]) => {
          categories = [];
          for (let i = 1; i <= 5; i++) {
            categories.push({
              id: i,
              name: `Category Name ${i}`,
            });
          }
          ctx.patchState({ categories });
        },
        error: (err) => {
          ctx.patchState({
            loading: false,
            error: 'Error trying to get categories.',
          });
        },
        complete: () => {
          ctx.patchState({ loading: false });
        },
      });
  }

  @Action(AddCategory)
  addCategory(ctx: StateContext<CategoriesStateModel>, action: AddCategory) {
    const state = ctx.getState();
    const category = action.category;
    category.id = state?.categories?.length + 1 || 1;

    ctx.patchState({
      categories: [...state.categories, category],
    });
  }

  @Action(UpdateCategory)
  updateCategory(
    ctx: StateContext<CategoriesStateModel>,
    action: UpdateCategory
  ) {
    const state = ctx.getState();
    const categories = state.categories.map((category) =>
      category.id === action.category.id ? action.category : category
    );
    ctx.patchState({ categories: categories });
  }

  @Action(DeleteCategory)
  deleteCategory(
    ctx: StateContext<CategoriesStateModel>,
    action: DeleteCategory
  ) {
    const state = ctx.getState();
    const categories = state.categories.filter(
      (category) => category.id !== action.id
    );
    ctx.patchState({ categories });
  }
}
