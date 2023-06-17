import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../https/http.service';
import { Category } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getCategory(): Observable<Category[]> {
    return this.httpService.fetch<any, Category[]>(
      `${environment.apiUrl}/categories`
    );
  }
}
