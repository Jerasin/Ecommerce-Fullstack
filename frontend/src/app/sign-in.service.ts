import { Inject, Injectable } from '@angular/core';
import {
  SignInInterface,
  SignInResponse,
} from '../interfaces/sign-in.interface';
import { Router } from '@angular/router';
import { HttpService } from './https/http.service';

@Injectable()
export class SignInService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService<SignInInterface, SignInResponse>,
    private router: Router
  ) {}

  // async signIn(props: SignInInterface): Promise<void> {
  //   const result = await lastValueFrom(
  //     this.http.post<SignInResponse>('http://localhost:3000/auth/login', props)
  //   );

  //   if (result.token != null) {
  //     localStorage.setItem('token', result.token);
  //     this.router.navigate(['products']);
  //   } else {
  //     alert('Error');
  //   }
  // }

  async signIn(props: SignInInterface): Promise<void> {
    const result = await this.httpService.fetch(
      'http://localhost:3000/auth/login',
      props
    );

    if (result.token != null) {
      localStorage.setItem('token', result.token);
      this.router.navigate(['products']);
    } else {
      alert('Error');
    }
  }
}
