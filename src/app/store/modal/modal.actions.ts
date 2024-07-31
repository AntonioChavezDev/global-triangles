export class SetEditingElement {
  static readonly type = '[Modal] Add Element To Edit';
  constructor(public element: any) {}
}

export class SetVisibility {
  static readonly type = '[Modal] Set Modal Visibility';
  constructor(public visibility: boolean) {}
}
