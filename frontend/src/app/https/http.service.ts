import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, catchError } from 'rxjs';

@Injectable()
export class HttpService<I, O> {
  constructor(private http: HttpClient) {}

  async fetch(path: string, props?: I): Promise<O> {
    try {
      if (props != null) {
        return lastValueFrom(this.http.post<O>(path, props));
      }
      return lastValueFrom(this.http.get<O>(path));
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
