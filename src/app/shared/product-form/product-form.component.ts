import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/pages/products/models/product.model';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ModalState } from 'src/app/store/modal/modal.state';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from 'src/app/pages/categories/models/category.model';
import { LoadCategories } from 'src/app/store/categories/categories.actions';
import { CategoriesState } from 'src/app/store/categories/categories.state';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  product!: Product;
  categories$: Observable<Category[]> = of([]);
  loadingCategories$: Observable<boolean> = of(false);
  private subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {}

  resetForm() {
    this.productForm = this.fb.group({
      id: [this?.product?.id || null],
      description: [this?.product?.description || '', Validators.required],
      price: [
        this?.product?.price || '',
        [Validators.required, Validators.min(1)],
      ],
      category: [this?.product?.category || null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadCategories());
    this.loadingCategories$ = this.store.select(CategoriesState.loading);
    this.categories$ = this.store.select(CategoriesState.categories);
    this.subs.add(
      this.store
        .select(ModalState.editingElement)
        .subscribe((editingElement) => {
          this.product = editingElement as Product;
          this.resetForm();
        })
    );
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
