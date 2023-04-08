import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  constructor() {}

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
}
