import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatagridComponent } from 'src/app/shared/datagrid/datagrid.component';
import { User } from './models/users.model';
import { Column } from 'src/app/shared/datagrid/models/column.model';
import {
  DeleteUser,
  LoadUsers,
} from 'src/app/store/users/users.actions';
import { UsersState } from 'src/app/store/users/users.state';
import { CreateUserComponent } from '../../shared/create-user/create-user.component';
import {
  SetEditingElement,
  SetVisibility,
} from 'src/app/store/modal/modal.actions';
import { EditUserComponent } from '../../shared/edit-user/edit-user.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DatagridComponent,
    CreateUserComponent,
    EditUserComponent,
    ConfirmDialogComponent,
  ],
})
export class UsersComponent implements OnInit {
  columns: Column<User>[] = [
    { property: 'id', title: 'ID' },
    { property: 'email', title: 'Email' },
    { property: 'name', title: 'Name' },
  ];
  users$: Observable<User[]> = of([]);
  loading$: Observable<boolean> = of(false);

  constructor(
    private store: Store,
    private confirmDialogService: ConfirmDialogService
  ) {}

  onEdit(user: User): void {
    this.store.dispatch(new SetEditingElement(user));
    this.store.dispatch(new SetVisibility(true));
  }

  onDelete(user: User): void {
    this.confirmDialogService.confirm().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(new DeleteUser(user.id));
      }
    });
  }

  ngOnInit(): void {
    this.users$ = this.store.select(UsersState.users);
    this.loading$ = this.store.select(UsersState.loading);
    this.store.dispatch(new LoadUsers());
  }
}
