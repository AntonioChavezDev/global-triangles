import { Route } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => authRoutes,
  },
];
