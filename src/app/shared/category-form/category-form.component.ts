import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/pages/categories/models/category.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ModalState } from 'src/app/store/modal/modal.state';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  categoryForm!: FormGroup;
  category!: Category;

  private subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {}

  resetForm() {
    this.categoryForm = this.fb.group({
      id: [this?.category?.id || null],
      name: [this?.category?.name || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.store
        .select(ModalState.editingElement)
        .subscribe((editingElement) => {
          this.category = editingElement as Category;
          this.resetForm();
        })
    );
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
