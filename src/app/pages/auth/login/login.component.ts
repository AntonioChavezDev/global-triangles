import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  error: string | null = null;

  loading$: Observable<boolean> = inject(Store).select(AuthState.loading);
  error$: Observable<string | null> = inject(Store).select(AuthState.error);

  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(new Login({ username, password }));
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.subs.push(
      this.loading$.subscribe((loading) => (this.loading = loading)),
      this.error$.subscribe((error) => (this.error = error))
    );
  }

  ngOnDestroy(): void {
    if (this.subs?.length > 0) {
      for (const sub of this.subs) {
        sub?.unsubscribe();
      }
    }
  }
}
