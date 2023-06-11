import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar';
import { Store } from '@ngrx/store';
import { showNavbarDashBoardDisable, showNavbarEnable } from '../store';

export interface TokenRedirectExpireOptions {
  keyLocalStorage?: string[];
  path?: string;
}

@Injectable()
export class ShareService {
  constructor(
    private router: Router,
    private store: Store,
    @Inject('NavbarService') private navbarService: NavbarService
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
    this.navbarService.setIsShowSignIn(false);
    this.navbarService.setSelectItem([]);
    this.navbarService.setSessionUser(null);
    this.store.dispatch(showNavbarDashBoardDisable());
    this.store.dispatch(showNavbarEnable());
    this.router.navigate(['signIn']);
  }
}
