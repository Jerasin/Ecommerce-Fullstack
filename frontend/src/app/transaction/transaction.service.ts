import { Injectable, Inject } from '@angular/core';
import {
  Transaction,
  TransactionProps,
} from '../../interfaces/transaction.interface';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('HttpService') private httpService: HttpService<any, Transaction>
  ) {}

  public createTransaction(value: TransactionProps): Observable<Transaction> {
    return this.httpService.fetch(
      `${environment.apiUrl}/transaction`,
      Method.POST,
      value
    );
  }
}