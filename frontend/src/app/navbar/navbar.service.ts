import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavbarService {
  private token = localStorage.getItem('token');
  private isLogin = new BehaviorSubject<boolean>(
    this.token != null ? true : false
  );
  constructor() {}

  public setIsShowSignIn(payload: boolean) {
    return this.isLogin.next(payload);
  }

  public getIsShowSignIn() {
    return this.isLogin.asObservable();
  }
}
