import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable()
export class GuardService {
  currentUrl: string = '';
  constructor(private router: Router) {
    console.log('constructor', this.router.url);
    this.currentUrl = this.router.url;
  }
  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token == null) {
      return this.router.createUrlTree(['/signIn']);
    }

    return true;
  }

  cannotActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token == null) return true;
    return this.router.createUrlTree(['/products']);
  }
}

export const privateRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(GuardService).canActivate();
};

export const publicRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(GuardService).cannotActivate();
};
