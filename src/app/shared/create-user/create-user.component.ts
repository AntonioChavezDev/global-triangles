import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ModalState } from 'src/app/store/modal/modal.state';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from 'src/app/pages/users/models/users.model';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { AddUser } from 'src/app/store/users/users.actions';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    UserFormComponent,
    ModalComponent,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit, OnDestroy {
  @ViewChild('userForm') userForm!: UserFormComponent;
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
    if (this.userForm.userForm.valid) {
      this.confirmDialogService.confirm().subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(
            new AddUser(this.userForm.userForm.value as User)
          );
          this.onHide();
        }
      });
    }
    this.userForm.userForm.markAllAsTouched();
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
