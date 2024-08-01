import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/pages/products/models/product.model';
import { Observable, of, Subscription } from 'rxjs';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Store } from '@ngxs/store';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { UpdateProduct } from 'src/app/store/products/products.actions';
import { ModalState } from 'src/app/store/modal/modal.state';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, ModalComponent, ProductFormComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  editingProduct!: Product;
  visible$: Observable<boolean> = of(false);
  editingProduct$: Observable<Product> = of();
  isEditMode$: Observable<boolean> = of(false);
  private subs: Subscription = new Subscription();
  @ViewChild('productForm') productForm!: ProductFormComponent;

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onHide() {
    this.store.dispatch(new SetEditingElement(null));
    this.store.dispatch(new SetVisibility(false));
  }

  onSubmit() {
    if (this.productForm.productForm.valid) {
      this.confirmDialogService.confirm().subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(
            new UpdateProduct(this.productForm.productForm.value as Product)
          );
          this.onHide();
        }
      });
    }
    this.productForm.productForm.markAllAsTouched();
  }

  ngOnInit(): void {
    this.visible$ = this.store.select(ModalState.visibility);
    this.editingProduct$ = this.store.select(ModalState.editingElement);
    this.subs.add(
      this.visible$.subscribe((visible) => {
        this.visible = visible;
      })
    );
    this.subs.add(
      this.editingProduct$.subscribe((product) => {
        this.editingProduct = product;
      })
    );
    this.isEditMode$ = this.store.select(ModalState.isEditMode);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
