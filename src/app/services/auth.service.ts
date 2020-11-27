import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  login<T>(email: string, password: string): Observable<T> {
    return this._http.post<T>(environment.api_url, { email, password });
  }
}
