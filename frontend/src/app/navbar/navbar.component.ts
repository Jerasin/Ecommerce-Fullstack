import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';
import { decodeToken } from '../../util';
import { SessionUser } from '../../interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isShowSignIn = false;
  isShowNavbar = true;
  itemSelectCount = 0;
  getIsShowSignInSub: Subscription;
  getSelectItemSub: Subscription;
  getSessionUser: Subscription;
  userId: number;
  role: string;

  constructor(
    @Inject('NavbarService') private navbarService: NavbarService,
    private router: Router
  ) {}

  signOut() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('shopping');
    localStorage.clear();
    this.navbarService.setIsShowSignIn(false);
    this.navbarService.setSelectItem([]);
    this.navbarService.setSessionUser(null);
    this.router.navigate(['signIn']);
  }

  ngOnInit(): void {
    console.log('ngOnInit NavbarComponent');
    let tokenSessionUser: SessionUser = null;
    const getSelectItem = localStorage.getItem('shopping');
    const getToken = localStorage.getItem('token');

    if (getToken != null) {
      tokenSessionUser = decodeToken(getToken);
    }

    if (tokenSessionUser != null) {
      this.userId = tokenSessionUser.id;
      this.navbarService.setSessionUser(tokenSessionUser);
    }

    if (getSelectItem != null) {
      this.navbarService.setSelectItem(JSON.parse(getSelectItem));
      this.itemSelectCount = JSON.parse(getSelectItem).length;
    }

    this.getIsShowSignInSub = this.navbarService
      .getIsShowSignIn()
      .subscribe((e) => (this.isShowSignIn = e));

    this.getSelectItemSub = this.navbarService
      .getSelectItem()
      .subscribe((e) => (this.itemSelectCount = e.length));

    this.getSessionUser = this.navbarService.getSessionUser().subscribe((e) => {
      this.role = e?.role;
    });
  }

  ngOnDestroy(): void {
    this.getIsShowSignInSub.unsubscribe();
    this.getSelectItemSub.unsubscribe();
    this.getSessionUser.unsubscribe();
  }
}
