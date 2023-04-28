import { Inject, Injectable } from '@angular/core';
import {
  SignInInterface,
  SignInResponse,
} from '../../interfaces/sign-in.interface';
import { Router } from '@angular/router';
import { HttpService, Method } from '../https/http.service';
import { NavbarService } from '../navbar/navbar.service';
import { environment } from '../../environments/environment';

@Injectable()
export class SignInService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService,
    @Inject('NavbarService')
    private navbarService: NavbarService,
    private router: Router
  ) {}

  signIn(props: SignInInterface): void {
    this.httpService
      .fetch<any, SignInResponse>(
        `${environment.apiUrl}/auth/login`,
        Method.POST,
        { props }
      )
      .subscribe({
        next: (value) => {
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
