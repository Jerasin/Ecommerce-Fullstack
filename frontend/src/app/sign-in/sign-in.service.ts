import { Inject, Injectable } from '@angular/core';
import { SignInInterface, SignInResponse, SessionUser } from '../../interfaces';
import { Router } from '@angular/router';
import { HttpService, Method } from '../https/http.service';
import { NavbarService } from '../navbar/navbar.service';
import { environment } from '../../environments/environment';
import { decodeToken } from '../../util';
import { Store } from '@ngrx/store';
import { isLogin, setSessionUser } from '../store';

@Injectable()
export class SignInService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService,
    private router: Router,
    private store: Store<{ isLoginReducer: boolean }>
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
            const tokenSessionUser = decodeToken(value.token);
            this.store.dispatch(setSessionUser({ session: tokenSessionUser }));
            this.store.dispatch(isLogin());
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
