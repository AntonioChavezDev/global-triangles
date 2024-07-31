import { Category } from '../../categories/models/category.model';

export type Product = {
  id: number;
  description: string;
  category: Category;
};
