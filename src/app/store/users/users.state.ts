import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadUsers, AddUser, UpdateUser, DeleteUser } from './users.actions';
import { User } from 'src/app/pages/users/models/users.model';
import { delay, of } from 'rxjs';
import { BaseStateModel } from '../models/base-state.model';

export interface UsersStateModel extends BaseStateModel {
  users: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    loading: false,
    error: '',
  },
})
@Injectable()
export class UsersState {
  @Selector()
  static users(state: UsersStateModel): User[] {
    return state && state.users ? state.users : [];
  }

  @Selector()
  static loading(state: UsersStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: UsersStateModel): string | null {
    return state.error;
  }

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UsersStateModel>) {
    ctx.patchState({ loading: true });

    of([])
      .pipe(delay(2000))
      .subscribe({
        next: (users: User[]) => {
          users = [];
          for (let i = 1; i <= 5; i++) {
            users.push({
              email: `user${i}@email.com`,
              id: i,
              name: `User Name ${i}`,
            });
          }
          ctx.patchState({ users });
        },
        error: (err) => {
          ctx.patchState({
            loading: false,
            error: 'Error trying to get users.',
          });
        },
        complete: () => {
          ctx.patchState({ loading: false });
        },
      });
  }

  @Action(AddUser)
  addUser(ctx: StateContext<UsersStateModel>, action: AddUser) {
    const state = ctx.getState();
    const user = action.user;
    user.id = state?.users?.length + 1 || 1;

    ctx.patchState({
      users: [...state.users, user],
    });
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UsersStateModel>, action: UpdateUser) {
    const state = ctx.getState();
    const users = state.users.map((user) =>
      user.id === action.user.id ? action.user : user
    );
    ctx.patchState({ users: users });
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UsersStateModel>, action: DeleteUser) {
    const state = ctx.getState();
    const users = state.users.filter((user) => user.id !== action.id);
    ctx.patchState({ users });
  }
}
