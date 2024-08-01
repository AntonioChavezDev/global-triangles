import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from 'src/app/shared/datagrid/models/column.model';
import { Product } from './models/product.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import {
  DeleteProduct,
  LoadProducts,
} from 'src/app/store/products/products.actions';
import { ProductsState } from 'src/app/store/products/products.state';
import { DatagridComponent } from '../../shared/datagrid/datagrid.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { EditProductComponent } from "../../shared/edit-product/edit-product.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DatagridComponent, ConfirmDialogComponent, EditProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  columns: Column<Product | any>[] = [
    { property: 'id', title: 'ID' },
    { property: 'description', title: 'Description' },
    { property: 'price', title: 'Price', columnType: 'currency' },
    { property: 'category.name', title: 'Category' },
  ];
  products$: Observable<Product[]> = of([]);
  loading$: Observable<boolean> = of(false);

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onEdit(product: Product): void {
    this.store.dispatch(new SetEditingElement(product));
    this.store.dispatch(new SetVisibility(true));
  }

  onDelete(product: Product): void {
    this.confirmDialogService.confirm().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new DeleteProduct(product.id));
      }
    });
  }

  ngOnInit(): void {
    this.products$ = this.store.select(ProductsState.products);
    this.loading$ = this.store.select(ProductsState.loading);
    this.store.dispatch(new LoadProducts());
  }
}
