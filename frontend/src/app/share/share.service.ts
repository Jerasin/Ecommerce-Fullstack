import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar';
import { Store } from '@ngrx/store';
import {
  isLogout,
  resetSelectItem,
  resetSessionUser,
  showNavbarDashBoardDisable,
  showNavbarDashBoardEnable,
  showNavbarDisable,
  showNavbarEnable,
} from '../store';
import { decodeToken } from 'src/util';

export interface TokenRedirectExpireOptions {
  keyLocalStorage?: string[];
  path?: string;
}

@Injectable()
export class ShareService {
  constructor(
    private router: Router,
    private store: Store<{ isLoginReducer: boolean }>
  ) {}

  public tokenRedirectExpire(
    props?: TokenRedirectExpireOptions
  ): Promise<boolean> {
    const { keyLocalStorage, path } = props ?? {};

    const targetPath = path ?? 'signIn';
    const targetKey = keyLocalStorage ?? 'token';

    for (const key of targetKey) {
      localStorage.removeItem(key);
    }

    return this.router.navigate([targetPath]);
  }

  public signOut(): void {
    localStorage.clear();
    this.store.dispatch(isLogout());
    this.store.dispatch(resetSessionUser());
    this.store.dispatch(resetSelectItem());
    // this.navbarService.setSelectItem([]);
    this.store.dispatch(showNavbarDashBoardDisable());
    this.store.dispatch(showNavbarEnable());
    this.router.navigate(['signIn']);
  }

  public showNavbarDashBoard(): void {
    this.store.dispatch(showNavbarDashBoardEnable());
    this.store.dispatch(showNavbarDisable());
  }

  public showNavbar(): void {
    this.store.dispatch(showNavbarDashBoardDisable());
    this.store.dispatch(showNavbarEnable());
  }

  public byPassLogout(): void {
    try {
      console.log('byPassLogout');
      const token = localStorage.getItem('token');
      const decode = decodeToken(token);

      if (decode == null) {
        this.store.dispatch(isLogout());
      }
    } catch (error) {
      this.store.dispatch(isLogout());
    }
  }
}
