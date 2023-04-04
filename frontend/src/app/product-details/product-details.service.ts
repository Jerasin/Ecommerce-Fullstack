import { Injectable, Inject } from '@angular/core';
import { Product } from '../../mock/productList';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductDetailService {
  constructor(
    @Inject('HttpService') private httpService: HttpService<any, Product[]>
  ) {}

  public getProduct(id: number): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/${id}`,
      Method.GET
    );
  }

  public updateProduct(props: Partial<Product>): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/${props.id}`,
      Method.PUT,
      props
    );
  }
}
