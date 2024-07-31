import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetEditingElement, SetVisibility } from './modal.actions';
import { BaseStateModel } from '../models/base-state.model';

export interface ModalStateModel extends BaseStateModel {
  editingElement: any;
  visibility: boolean;
}

@State<ModalStateModel>({
  name: 'modal',
  defaults: {
    editingElement: null,
    visibility: false,
    loading: false,
    error: '',
  },
})
@Injectable()
export class ModalState implements NgxsOnInit {
  private modalEditingElementKey = 'modalEditingElement';

  @Selector()
  static editingElement(state: ModalStateModel): any {
    return state && state.editingElement ? state.editingElement : null;
  }

  @Selector()
  static isEditMode(state: ModalStateModel): boolean {
    return state.editingElement !== null && state.editingElement !== 'null';
  }

  @Selector()
  static visibility(state: ModalStateModel): boolean {
    return state && state.visibility ? state.visibility : false;
  }

  @Selector()
  static loading(state: ModalStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: ModalStateModel): string | null {
    return state.error;
  }

  @Action(SetEditingElement)
  setEditingElement(
    ctx: StateContext<ModalStateModel>,
    action: SetEditingElement
  ) {
    ctx.patchState({
      editingElement: action.element,
    });
    localStorage.setItem(
      this.modalEditingElementKey,
      JSON.stringify(action.element)
    );
  }

  @Action(SetVisibility)
  setVisibility(ctx: StateContext<ModalStateModel>, action: SetVisibility) {
    ctx.patchState({
      visibility: action.visibility,
    });
  }

  ngxsOnInit(ctx: StateContext<ModalStateModel>): void {
    const editingElement = localStorage.getItem(this.modalEditingElementKey);
    if (editingElement && editingElement != 'null') {
      ctx.patchState({
        editingElement: JSON.parse(editingElement),
        visibility: true,
      });
    }
  }
}
