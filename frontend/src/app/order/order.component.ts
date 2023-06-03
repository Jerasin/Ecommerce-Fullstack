import { Component, Inject, OnInit } from '@angular/core';
import { NavbarService, SelectItem } from '../navbar/navbar.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OrderService } from './order.service';
import {
  Status,
  TransactionProps,
} from '../../interfaces/transaction.interface';
import { Observable, forkJoin } from 'rxjs';
import { Order } from '../../interfaces';
import { TransactionService } from '../transaction/transaction.service';
import { decodeToken } from '../../util';
import { ShareService } from '../share';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  selectItem: SelectItem[] = [];
  token: string | null;
  email: string | null = null;
  saleOrderForm = new FormGroup({
    productId: new FormControl(null),
    amount: new FormControl(null),
    name: new FormControl(null),
    price: new FormControl(null),
  });

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    if (this.token != null) {
      const decode = decodeToken(this.token);
      this.email = decode.email;
    }

    this.navbarService.getSelectItem().subscribe({
      next: (value) => {
        this.selectItem = value;
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

  constructor(
    @Inject('NavbarService') private navbarService: NavbarService,
    @Inject('OrderService') private orderService: OrderService,
    @Inject('TransactionService')
    private transactionService: TransactionService,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  public deleteSelectItem(productId: number) {
    const getSelectItem = this.selectItem.findIndex(
      (e) => e.productId == productId
    );

    if (getSelectItem != -1) {
      this.selectItem.splice(getSelectItem, 1);
      localStorage.setItem('shopping', JSON.stringify(this.selectItem));
      this.navbarService.setSelectItem(this.selectItem);
    }
  }

  public createTransaction() {
    const transactionProps = this.calculateSummary();

    this.transactionService.createTransaction(transactionProps).subscribe({
      next: (value) => {
        console.log('saleOrderId', value.orderId);
        forkJoin(this.updateWareHouse()).subscribe((e) => {
          console.log('updateWareHouse', e);
        });
        forkJoin(this.createSaleOrder(value.orderId)).subscribe((e) => {
          console.log('updateWareHouse', e);
        });

        // localStorage.removeItem('shopping');
        // this.router.navigate(['products']);
        this.navbarService.setSelectItem([]);
        return this.shareService.tokenRedirectExpire({
          keyLocalStorage: ['shopping'],
          path: 'products',
        });
      },
      error: () => {
        return this.shareService.tokenRedirectExpire();
      },
    });
  }

  public createSaleOrder(saleOrderId: string): Observable<Order>[] {
    return this.selectItem.map((item) => {
      console.log('item', saleOrderId);

      if (this.email == null) throw 'Error';

      return this.orderService.createSaleOrder({
        ...item,
        transactionId: saleOrderId,
        productName: item.name,
        createBy: this.email,
      });
    });
  }

  public updateWareHouse() {
    return this.selectItem.map((item) => {
      return this.orderService.updateWareHouse({
        productId: item.productId,
        amount: item.amount,
      });
    });
  }

  public calculateSummary(): TransactionProps {
    const runningId = Math.random() * 100;

    const totalPrice = this.selectItem.reduce(
      (acc, i) => acc + i.price * i.amount,
      0
    );

    const totalAmount = this.selectItem.reduce((acc, i) => acc + i.amount, 0);

    if (this.email == null) throw 'Error';

    const transactionProps: TransactionProps = {
      orderId: Math.round(runningId).toString(),
      totalPrice,
      totalAmount,
      createBy: this.email,
      status: Status.PENDING,
    };

    return transactionProps;
  }
}
