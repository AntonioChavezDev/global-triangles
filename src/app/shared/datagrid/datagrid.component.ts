import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Column } from './models/column.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
})
export class DatagridComponent {
  @Input() cols: Column<any>[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(item: any): void {
    this.edit.emit(item);
  }

  onDelete(item: any): void {
    this.delete.emit(item);
  }
}
