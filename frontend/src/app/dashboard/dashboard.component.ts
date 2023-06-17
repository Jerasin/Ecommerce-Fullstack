import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import {
  DashboardCount,
  Status,
  Transaction,
  SessionUser,
} from '../../interfaces';
import { DateTime } from 'luxon';
import { decodeToken } from '../../util';
import { ShareService } from '../share';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reports = new BehaviorSubject<Transaction[]>([]);
  email: string;
  showNavbarDashBoardReducer$: Observable<boolean>;
  count: DashboardCount;
  totalPage: number[];

  constructor(
    @Inject('DashboardService') private dashboardService: DashboardService,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  ngOnInit(): void {
    let tokenSessionUser: SessionUser = null;
    const getToken = localStorage.getItem('token');
    tokenSessionUser = decodeToken(getToken);
    this.email = tokenSessionUser.email;

    forkJoin({
      getTransactions: this.dashboardService.getTransactions(),
      getUserCount: this.dashboardService.getUserCount(),
      getProductCount: this.dashboardService.getProductCount(),
      getCategoryCount: this.dashboardService.getCategoryCount(),
      getTransactionCount: this.dashboardService.getTransactionCount(),
    }).subscribe({
      next: ({
        getTransactions,
        getUserCount,
        getProductCount,
        getCategoryCount,
        getTransactionCount,
      }) => {
        this.createRange(getTransactionCount);
        this.count = {
          user: getUserCount,
          product: getProductCount,
          transaction: getTransactionCount,
          category: getCategoryCount,
        };
        const convertTimeZone = getTransactions.data.map((i) => {
          if (i.updatedAt == null) {
            return {
              ...i,
              createdAt: this.convertTimeZoneUtcToBkk(i.createdAt),
            };
          }
          return {
            ...i,
            createdAt: this.convertTimeZoneUtcToBkk(i.createdAt),
            updatedAt: this.convertTimeZoneUtcToBkk(i.updatedAt),
          };
        });
        console.log('convertTimeZone', convertTimeZone);
        this.reports.next(convertTimeZone);
      },
    });
  }

  private createRange(range: number) {
    const transactions = new Array(range).fill(0).map((n, index) => index + 1);
    this.totalPage = transactions;
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
