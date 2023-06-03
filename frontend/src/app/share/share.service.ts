import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface TokenRedirectExpireOptions {
  keyLocalStorage?: string[];
  path?: string;
}

@Injectable()
export class ShareService {
  constructor(private router: Router) {}

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
}
