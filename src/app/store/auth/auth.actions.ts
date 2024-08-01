export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class SetToken {
  static readonly type = '[Auth] Set Token';
  constructor(public token: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {}
}
