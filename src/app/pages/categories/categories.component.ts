import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from "../../shared/category-form/category-form.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}
