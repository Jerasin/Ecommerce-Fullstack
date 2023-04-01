import { Inject, Injectable } from '@angular/core';
import { Product } from '../../mock/productList';
import { HttpService } from '../https/http.service';

@Injectable()
export class ProductListService {
  constructor(
    @Inject('HttpService') private httpService: HttpService<any, Product[]>
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.httpService.fetch('http://localhost:3000/products');
  }
}
