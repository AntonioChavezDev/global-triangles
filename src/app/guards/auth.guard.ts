import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../store/auth/auth.state';
import { GT_ROUTES } from '../constants/gt-routes.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthState.isLoggedIn).pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate([`/${GT_ROUTES.FULL_PATHS.LOGIN}`]);
          return false;
        }
        return true;
      })
    );
  }
}
