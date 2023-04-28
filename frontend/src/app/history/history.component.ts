import { Component, Inject, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import jwtDecode from 'jwt-decode';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  private userId: number;
  public data: Transaction[];

  constructor(
    @Inject('HistoryService') private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decode: any = jwtDecode(token);
    this.userId = decode.id;

    this.historyService.getTransactionsByCreated(this.userId).subscribe({
      next: (value) => {
        this.data = value;
      },
    });
  }
}
