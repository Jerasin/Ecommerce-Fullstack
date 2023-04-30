import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reports = new BehaviorSubject<Transaction[]>([]);
  constructor(
    @Inject('DashboardService') private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getTransactions().subscribe({
      next: (value) => {
        this.reports.next(value);
      },
    });
  }
}
