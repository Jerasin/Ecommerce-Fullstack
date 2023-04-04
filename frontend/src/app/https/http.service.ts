import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

@Injectable()
export class HttpService<I, O> {
  constructor(private http: HttpClient) {}

  fetch(path: string, method = Method.GET, props?: I): Observable<any> {
    let http = null;

    switch (method) {
      case Method.GET:
        http = this.http.get<O>(path);
        break;
      case Method.POST:
        http = this.http.post<O>(path, props);
        break;
      case Method.PUT:
        http = this.http.put<O>(path, props);
        break;
    }

    return http;
  }
}
