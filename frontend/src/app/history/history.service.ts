import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../../interfaces/transaction.interface';

@Injectable()
export class HistoryService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getTransactionsByCreated(email: string): Observable<Transaction[]> {
    return this.httpService.fetch<any, Transaction[]>(
      `${environment.apiUrl}/transaction/${email}`
    );
  }
}
