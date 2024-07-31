import { Route } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';
import { GT_ROUTES } from './constants/gt-routes.constant';

export const appRoutes: Route[] = [
  {
    path: `${GT_ROUTES.ENDPOINTS.AUTH}`,
    loadChildren: () => authRoutes,
  },
  {
    path: `${GT_ROUTES.ENDPOINTS.USERS}`,
    loadComponent: () =>
      import('./pages/users/users.component').then((mod) => mod.UsersComponent),
  },
  {
    path: `${GT_ROUTES.ENDPOINTS.CATEGORIES}`,
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (mod) => mod.CategoriesComponent
      ),
  },
];
