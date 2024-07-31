import { User } from 'src/app/pages/users/models/users.model';

export class LoadUsers {
  static readonly type = '[Users] Load Users';
}

export class AddUser {
  static readonly type = '[Users] Add User';
  constructor(public user: User) {}
}

export class UpdateUser {
  static readonly type = '[Users] Update User';
  constructor(public user: User) {}
}

export class DeleteUser {
  static readonly type = '[Users] Delete User';
  constructor(public id: number) {}
}
