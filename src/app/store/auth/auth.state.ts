import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, SetToken } from './auth.actions';
import { delay, of } from 'rxjs';
import { BaseStateModel } from '../models/base-state.model';

export interface AuthStateModel extends BaseStateModel {
  token: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    loading: false,
    error: '',
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {
  private authTokenKey = 'authToken';

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ loading: true });

    of('fake-jwt-token')
      .pipe(delay(2000))
      .subscribe({
        next: (token) => {
          ctx.dispatch(new SetToken(token));
        },
        error: (err) => {
          ctx.patchState({
            loading: false,
            error: 'Invalid username or password.',
          });
        },
        complete: () => {
          ctx.patchState({ loading: false });
        },
      });
  }

  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, action: SetToken) {
    ctx.patchState({ token: action.token, loading: false, error: null });
    localStorage.setItem(this.authTokenKey, action.token);
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    const token = localStorage.getItem(this.authTokenKey);
    if (token) {
      ctx.patchState({ token });
    }
  }
}
