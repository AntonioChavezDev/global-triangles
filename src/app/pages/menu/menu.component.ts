import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { GT_ROUTES } from 'src/app/constants/gt-routes.constant';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: `/${GT_ROUTES.ENDPOINTS.USERS}`,
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: `/${GT_ROUTES.ENDPOINTS.PRODUCTS}`,
      },
      {
        label: 'Categories',
        icon: 'pi pi-tags',
        routerLink: `/${GT_ROUTES.ENDPOINTS.CATEGORIES}`,
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: `/${GT_ROUTES.FULL_PATHS.LOGIN}`,
      },
    ];
  }
}
