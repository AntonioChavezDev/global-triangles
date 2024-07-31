import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { AddCategory } from 'src/app/store/categories/categories.actions';
import { Category } from 'src/app/pages/categories/models/category.model';
import { ModalState } from 'src/app/store/modal/modal.state';
import { ModalComponent } from '../modal/modal.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ModalComponent, CategoryFormComponent, ButtonModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('categoryForm') categoryForm!: CategoryFormComponent;
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
    if (this.categoryForm.categoryForm.valid) {
      this.confirmDialogService.confirm().subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(
            new AddCategory(this.categoryForm.categoryForm.value as Category)
          );
          this.onHide();
        }
      });
    }
    this.categoryForm.categoryForm.markAllAsTouched();
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
