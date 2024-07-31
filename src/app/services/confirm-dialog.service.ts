import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private confirmSubject = new Subject<boolean>();
  private dialogState = new Subject<{
    message: string;
    header: string;
    icon: string;
    visible: boolean;
  }>();

  constructor() {}

  confirm(
    message: string = 'Are you sure?',
    header: string = 'Confirmation',
    icon: string = 'pi pi-exclamation-triangle'
  ): Observable<boolean> {
    this.confirmSubject = new Subject<boolean>();
    this.dialogState.next({ message, header, icon, visible: true });
    return this.confirmSubject.asObservable();
  }

  onConfirm() {
    this.confirmSubject.next(true);
    this.confirmSubject.complete();
  }

  onReject() {
    this.confirmSubject.next(false);
    this.confirmSubject.complete();
  }

  getDialogState(): Observable<{
    message: string;
    header: string;
    icon: string;
    visible: boolean;
  }> {
    return this.dialogState.asObservable();
  }

  closeDialog() {
    this.dialogState.next({
      message: '',
      header: '',
      icon: '',
      visible: false,
    });
  }
}
