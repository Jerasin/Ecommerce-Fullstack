import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LayoutService {
  showNavbar = new BehaviorSubject<boolean>(true);
  constructor() {}

  public setShowNavbar(value: boolean): void {
    this.showNavbar.next(value);
  }

  public getShowNavbar(): Observable<boolean> {
    return this.showNavbar.asObservable();
  }
}
