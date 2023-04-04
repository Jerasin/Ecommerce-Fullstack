import { Inject, Injectable } from '@angular/core';
import {
  SignInInterface,
  SignInResponse,
} from '../../interfaces/sign-in.interface';
import { Router } from '@angular/router';
import { HttpService, Method } from '../https/http.service';
import { NavbarService } from '../navbar/navbar.service';

@Injectable()
export class SignInService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService<SignInInterface, SignInResponse>,
    @Inject('NavbarService')
    private navbarService: NavbarService,
    private router: Router
  ) {}

  signIn(props: SignInInterface): void {
    this.httpService
      .fetch('http://localhost:3000/auth/login', Method.POST, props)
      .subscribe({
        next: (value) => {
          console.log('value', value);
          if (value.token != null) {
            localStorage.setItem('token', value.token);
            this.navbarService.setIsShowSignIn(true);
            this.router.navigate(['products']);
          } else {
            alert('Error');
          }
        },
        error: (e) => {
          console.log('error', e);
          if (e.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['signIn']);
          }
        },
      });
  }
}
