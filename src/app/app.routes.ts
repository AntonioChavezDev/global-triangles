import { Route } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';
import { GT_ROUTES } from './constants/gt-routes.constant';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: `${GT_ROUTES.ENDPOINTS.USERS}`,
    pathMatch: 'full',
  },
  {
    path: `${GT_ROUTES.ENDPOINTS.AUTH}`,
    loadChildren: () => authRoutes,
  },
  {
    path: `${GT_ROUTES.ENDPOINTS.USERS}`,
    loadComponent: () =>
      import('./pages/users/users.component').then((mod) => mod.UsersComponent),
    canActivate: [AuthGuard],
  },
  {
    path: `${GT_ROUTES.ENDPOINTS.CATEGORIES}`,
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (mod) => mod.CategoriesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: `${GT_ROUTES.ENDPOINTS.PRODUCTS}`,
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (mod) => mod.ProductsComponent
      ),
    canActivate: [AuthGuard],
  },
];
