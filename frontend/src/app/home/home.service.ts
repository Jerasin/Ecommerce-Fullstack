import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../https/http.service';
import { Product } from '../../mock/productList';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getSuggestProduct(): Observable<Product[]> {
    return this.httpService.fetch<any, Product[]>(
      `${environment.apiUrl}/products/productSuggest`
    );
  }
}
