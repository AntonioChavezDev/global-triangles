import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/pages/categories/models/category.model';
import { Observable, of, Subscription } from 'rxjs';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Store } from '@ngxs/store';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { UpdateCategory } from 'src/app/store/categories/categories.actions';
import { ModalState } from 'src/app/store/modal/modal.state';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, ModalComponent, CategoryFormComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  editingCategory!: Category;
  visible$: Observable<boolean> = of(false);
  editingCategory$: Observable<Category> = of();
  isEditMode$: Observable<boolean> = of(false);
  private subs: Subscription = new Subscription();
  @ViewChild('categoryForm') categoryForm!: CategoryFormComponent;

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onHide() {
    this.store.dispatch(new SetEditingElement(null));
    this.store.dispatch(new SetVisibility(false));
  }

  onSubmit() {
    if (this.categoryForm.categoryForm.valid) {
      this.confirmDialogService.confirm().subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(
            new UpdateCategory(this.categoryForm.categoryForm.value as Category)
          );
          this.onHide();
        }
      });
    }
    this.categoryForm.categoryForm.markAllAsTouched();
  }

  ngOnInit(): void {
    this.visible$ = this.store.select(ModalState.visibility);
    this.editingCategory$ = this.store.select(ModalState.editingElement);
    this.subs.add(
      this.visible$.subscribe((visible) => {
        this.visible = visible;
      })
    );
    this.subs.add(
      this.editingCategory$.subscribe((category) => {
        this.editingCategory = category;
      })
    );
    this.isEditMode$ = this.store.select(ModalState.isEditMode);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
