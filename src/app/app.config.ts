import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { AuthState } from './store/auth/auth.state';
import { UsersState } from './store/users/users.state';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModalState } from './store/modal/modal.state';
import { CategoriesState } from './store/categories/categories.state';
import { ProductsState } from './store/products/products.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideStore([
      AuthState,
      UsersState,
      ModalState,
      CategoriesState,
      ProductsState,
    ]),
  ],
};
