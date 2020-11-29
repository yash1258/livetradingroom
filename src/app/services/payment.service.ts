import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _http: HttpClient) {}

  createOrder(data) {
    return this._http.post(environment.api_url + '/payments/order', data);
  }
  verifyOrder(params: HttpParams) {
    return this._http.get(environment.api_url + '/payments/verify', {
      params: params,
    });
  }
}
