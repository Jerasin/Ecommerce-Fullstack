import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { Transaction } from '../../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.httpService.fetch<any, Transaction[]>(
      `${environment.apiUrl}/transaction`
    );
  }
}