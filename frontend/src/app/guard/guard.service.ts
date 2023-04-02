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
  constructor(private router: Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token == null) return false;
    return true;
  }

  cannotActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token == null) return true;
    return false;
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
  console.log('stats', state);
  return inject(GuardService).cannotActivate();
};
