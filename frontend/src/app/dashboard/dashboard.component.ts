import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status, Transaction } from '../../interfaces';
import { DateTime } from 'luxon';
import { SessionUser } from '../../interfaces';
import { decodeToken } from '../../util';
import { ShareService } from '../share';
import { Store } from '@ngrx/store';
import { showNavbarDashBoardEnable, showNavbarDisable } from '../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reports = new BehaviorSubject<Transaction[]>([]);
  email: string;
  showNavbarDashBoardReducer$: Observable<boolean>;

  constructor(
    @Inject('DashboardService') private dashboardService: DashboardService,
    @Inject('ShareService') private shareService: ShareService,
    private store: Store
  ) {
    this.store.dispatch(showNavbarDashBoardEnable());
    this.store.dispatch(showNavbarDisable());
  }

  ngOnInit(): void {
    let tokenSessionUser: SessionUser = null;
    const getToken = localStorage.getItem('token');
    tokenSessionUser = decodeToken(getToken);
    this.email = tokenSessionUser.email;

    this.dashboardService.getTransactions().subscribe({
      next: (value) => {
        const convertTimeZone = value.map((i) => {
          if (i.updatedAt == null)
            return {
              ...i,
              createdAt: this.convertTimeZoneUtcToBkk(i.createdAt),
            };

          return {
            ...i,
            updatedAt: this.convertTimeZoneUtcToBkk(i.updatedAt),
          };
        });

        console.log('convertTimeZone', convertTimeZone);

        this.reports.next(convertTimeZone);
      },
      error: (err) => {
        if (err?.status == 401) {
          this.shareService.tokenRedirectExpire();
          return;
        }

        throw err;
      },
    });
  }

  private convertTimeZoneUtcToBkk(dateTime: string): string {
    return DateTime.fromISO(dateTime).setZone('Asia/Bangkok').toISO({
      suppressSeconds: true,
      suppressMilliseconds: true,
      includeOffset: false,
    });
  }

  public approveTransaction(transaction: Transaction) {
    transaction.status = Status.APPROVE;
    transaction.updatedAt = DateTime.utc().toISO();
    return this.dashboardService.updateTransaction(transaction).subscribe();
  }

  public rejectTransaction(transaction: Transaction) {
    transaction.status = Status.REJECT;
    transaction.updatedAt = DateTime.utc().toISO();
    return this.dashboardService.updateTransaction(transaction).subscribe();
  }
}
