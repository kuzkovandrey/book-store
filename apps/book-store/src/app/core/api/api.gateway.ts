import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGatewayRequestParams } from '@core/models';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGateway {
  constructor(private readonly http: HttpClient) {}

  get<T>({ url, params: queryParams }: ApiGatewayRequestParams): Observable<T> {
    return this.http.get<T>(url, {
      params: {
        ...queryParams,
      },
    });
  }

  post<T>({
    url,
    body,
    params: queryParams,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.post<T>(url, body, {
      params: {
        ...queryParams,
      },
    });
  }

  patch<T>({
    url,
    body,
    params: queryParams,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.patch<T>(url, body, {
      params: {
        ...queryParams,
      },
    });
  }

  delete<T>({
    url,
    params: queryParams,
  }: ApiGatewayRequestParams): Observable<T> {
    return this.http.delete<T>(url, {
      params: {
        ...queryParams,
      },
    });
  }
}
