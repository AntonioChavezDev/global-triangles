import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { AddProduct } from 'src/app/store/products/products.actions';
import { Product } from 'src/app/pages/products/models/product.model';
import { ModalState } from 'src/app/store/modal/modal.state';
import { ModalComponent } from '../modal/modal.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ModalComponent, ProductFormComponent, ButtonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit, OnDestroy {
  @ViewChild('productForm') productForm!: ProductFormComponent;
  visible: boolean = false;
  visible$: Observable<boolean> = of(false);
  isEditMode$: Observable<boolean> = of(true);
  private subs: Subscription = new Subscription();

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onHide() {
    this.store.dispatch(new SetVisibility(false));
  }

  onAdd(): void {
    this.store.dispatch(new SetEditingElement(null));
    this.store.dispatch(new SetVisibility(true));
  }

  onSubmit() {
    if (this.productForm.productForm.valid) {
      this.confirmDialogService.confirm().subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(
            new AddProduct(this.productForm.productForm.value as Product)
          );
          this.onHide();
        }
      });
    }
    this.productForm.productForm.markAllAsTouched();
  }

  ngOnInit(): void {
    this.visible$ = this.store.select(ModalState.visibility);
    this.subs.add(
      this.visible$.subscribe((visible) => {
        this.visible = visible;
      })
    );

    this.isEditMode$ = this.store.select(ModalState.isEditMode);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
