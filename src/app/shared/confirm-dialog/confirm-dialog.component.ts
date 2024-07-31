import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  message: string = '';
  header: string = 'Confirmation';
  icon: string = 'pi pi-exclamation-triangle';
  private dialogSubscription: Subscription = new Subscription();

  constructor(private confirmDialogService: ConfirmDialogService) {}

  onConfirm() {
    this.confirmDialogService.onConfirm();
    this.confirmDialogService.closeDialog();
  }

  onReject() {
    this.confirmDialogService.onReject();
    this.confirmDialogService.closeDialog();
  }

  ngOnInit(): void {
    this.dialogSubscription = this.confirmDialogService
      .getDialogState()
      .subscribe((state) => {
        this.message = state.message;
        this.header = state.header;
        this.icon = state.icon;
        this.visible = state.visible;
      });
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
