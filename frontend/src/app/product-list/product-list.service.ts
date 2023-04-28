import { Inject, Injectable } from '@angular/core';
import { Product } from '../../mock/productList';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductListService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  getProducts(): Observable<any> {
    return this.httpService.fetch('http://localhost:3000/products', Method.GET);
  }

  getProductById(id: number): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/${id}`,
      Method.GET
    );
  }

  getProductByCategory(id: number): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/category/${id}`,
      Method.GET
    );
  }

  getWareHouses(): Observable<any> {
    return this.httpService.fetch(
      'http://localhost:3000/wareHouse',
      Method.GET
    );
  }
}
