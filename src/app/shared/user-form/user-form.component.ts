import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import { User } from 'src/app/pages/users/models/users.model';
import { ModalState } from 'src/app/store/modal/modal.state';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  @Input() user!: User;

  private subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {}

  resetForm() {
    this.userForm = this.fb.group({
      id: [this?.user?.id || null],
      name: [this?.user?.name || '', Validators.required],
      email: [this?.user?.email || '', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.store
        .select(ModalState.editingElement)
        .subscribe((editingElement) => {
          this.user = editingElement as User;
          this.resetForm();
        })
    );
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
