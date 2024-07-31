import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogComponent,
  ],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() confirmText = 'Save';
  @Input() cancelText = 'Close';

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onCancel() {
    this.confirmDialogService.confirm().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new SetEditingElement(null));
        this.store.dispatch(new SetVisibility(false));
      }
    });
  }
}
