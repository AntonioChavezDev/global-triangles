import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from 'src/app/shared/datagrid/models/column.model';
import { Category } from './models/category.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import {
  DeleteCategory,
  LoadCategories,
} from 'src/app/store/categories/categories.actions';
import { CategoriesState } from 'src/app/store/categories/categories.state';
import { DatagridComponent } from '../../shared/datagrid/datagrid.component';
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { EditCategoryComponent } from "../../shared/edit-category/edit-category.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, DatagridComponent, ConfirmDialogComponent, EditCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  columns: Column<Category>[] = [
    { property: 'id', title: 'ID' },
    { property: 'name', title: 'Name' },
  ];
  categories$: Observable<Category[]> = of([]);
  loading$: Observable<boolean> = of(false);

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onEdit(category: Category): void {
    this.store.dispatch(new SetEditingElement(category));
    this.store.dispatch(new SetVisibility(true));
  }

  onDelete(category: Category): void {
    this.confirmDialogService.confirm().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new DeleteCategory(category.id));
      }
    });
  }

  ngOnInit(): void {
    this.categories$ = this.store.select(CategoriesState.categories);
    this.loading$ = this.store.select(CategoriesState.loading);
    this.store.dispatch(new LoadCategories());
  }
}
