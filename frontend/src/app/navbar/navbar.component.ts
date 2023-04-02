import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isShowSignIn = false;

  constructor(
    @Inject('NavbarService') private navbarService: NavbarService,
    private router: Router
  ) {
    this.navbarService
      .getIsShowSignIn()
      .subscribe((e) => (this.isShowSignIn = e));
  }

  signOut() {
    localStorage.removeItem('token');
    this.navbarService.setIsShowSignIn(false);
    this.router.navigate(['signIn']);
  }

  ngOnInit(): void {
    console.log('ngOnInit NavbarComponent');
  }
}
