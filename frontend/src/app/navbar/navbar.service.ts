import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUser } from '../../interfaces/user.interface';

export interface SelectItem {
  productId: number;
  amount: number;
  name: string;
  price: number;
}

@Injectable()
export class NavbarService {
  private token = localStorage.getItem('token');
  private isLogin = new BehaviorSubject<boolean>(
    this.token != null ? true : false
  );
  private selectItem = new BehaviorSubject<SelectItem[]>([]);
  private sessionUser = new BehaviorSubject<SessionUser>(null);

  public setIsShowSignIn(payload: boolean) {
    return this.isLogin.next(payload);
  }

  public getIsShowSignIn() {
    return this.isLogin.asObservable();
  }

  public setSelectItem(payload: SelectItem[]) {
    return this.selectItem.next(payload);
  }

  public getSelectItem() {
    return this.selectItem.asObservable();
  }

  public setSessionUser(payload: SessionUser) {
    return this.sessionUser.next(payload);
  }

  public getSessionUser(): Observable<SessionUser> {
    return this.sessionUser.asObservable();
  }
}
