import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { User } from 'src/app/pages/users/models/users.model';
import { UpdateUser } from 'src/app/store/users/users.actions';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { ModalState } from 'src/app/store/modal/modal.state';
import { DialogModule } from 'primeng/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, DialogModule, UserFormComponent, ModalComponent, ConfirmDialogComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  visible: boolean = false;
  editingUser!: User;
  visible$: Observable<boolean> = of(false);
  editingUser$: Observable<User> = of();
  isEditMode$: Observable<boolean> = of(false);
  private subs: Subscription = new Subscription();
  @ViewChild('userForm') userForm!: UserFormComponent;

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onHide() {
    this.store.dispatch(new SetEditingElement(null));
    this.store.dispatch(new SetVisibility(false));
  }

  onSubmit() {
    if (this.userForm.userForm.valid) {
      this.confirmDialogService.confirm().subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(
            new UpdateUser(this.userForm.userForm.value as User)
          );
          this.onHide();
        }
      });
    }
    this.userForm.userForm.markAllAsTouched();
  }

  ngOnInit(): void {
    this.visible$ = this.store.select(ModalState.visibility);
    this.editingUser$ = this.store.select(ModalState.editingElement);
    this.subs.add(
      this.visible$.subscribe((visible) => {
        this.visible = visible;
      })
    );
    this.subs.add(
      this.editingUser$.subscribe((user) => {
        this.editingUser = user;
      })
    );
    this.isEditMode$ = this.store.select(ModalState.isEditMode);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
