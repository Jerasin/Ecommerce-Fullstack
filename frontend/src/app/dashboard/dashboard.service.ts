import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { Transaction } from '../../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NavbarService } from '../navbar';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('HttpService') private httpService: HttpService,
    @Inject('NavbarService') private navbarService: NavbarService
  ) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.httpService.fetch<any, Transaction[]>(
      `${environment.apiUrl}/transaction`
    );
  }

  public updateTransaction(transaction: Transaction) {
    return this.httpService.fetch<any, Transaction[]>(
      `${environment.apiUrl}/transaction/${transaction.id}`,
      Method.PUT,
      { props: transaction }
    );
  }

  public test() {
    this.navbarService.setShowNavbar(false);
  }
}
