import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { GT_ROUTES } from 'src/app/constants/gt-routes.constant';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Logout } from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  items: MenuItem[] = [];

  private subscription: Subscription = new Subscription();

  private readonly loginItem = {
    label: 'Login',
    icon: 'pi pi-sign-in',
    routerLink: `/${GT_ROUTES.FULL_PATHS.LOGIN}`,
  };

  private logoutItem: MenuItem;

  constructor(private store: Store, private router: Router) {
    this.logoutItem = {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.store.dispatch(new Logout());
        this.router.navigate([`/${GT_ROUTES.FULL_PATHS.LOGIN}`]);
      },
    };
  }

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
    ];

    this.subscription.add(
      this.store.select(AuthState.isLoggedIn).subscribe((isLoggedIn) => {
        this.items = this.items.filter(
          (item) => item.label !== 'Login' && item.label !== 'Logout'
        );

        if (isLoggedIn) {
          this.items.push(this.logoutItem);
        } else {
          this.items.push(this.loginItem);
        }
      })
    );
  }
}
