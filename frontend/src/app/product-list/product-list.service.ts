import { Inject, Injectable } from '@angular/core';
import { Product } from '../../mock/productList';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductListService {
  constructor(
    @Inject('HttpService') private httpService: HttpService<any, Product[]>
  ) {}

  getProducts(): Observable<any> {
    return this.httpService.fetch('http://localhost:3000/products', Method.GET);
  }

  getWareHouses(): Observable<any> {
    return this.httpService.fetch(
      'http://localhost:3000/wareHouse',
      Method.GET
    );
  }
}
