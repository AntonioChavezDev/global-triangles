import { Category } from 'src/app/pages/categories/models/category.model';

export class LoadCategories {
  static readonly type = '[Categories] Load Categories';
}

export class AddCategory {
  static readonly type = '[Categories] Add Category';
  constructor(public category: Category) {}
}

export class UpdateCategory {
  static readonly type = '[Categories] Update Category';
  constructor(public category: Category) {}
}

export class DeleteCategory {
  static readonly type = '[Categories] Delete Category';
  constructor(public id: number) {}
}
