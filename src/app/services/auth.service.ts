import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { add, isBefore, parseJSON } from 'date-fns';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  constructor(private _http: HttpClient, private router: Router) {}
  login(email: string, password: string): void {
    this._http
      .post<{ id_token: string; expires_at: number }>(
        environment.api_url + '/users/login',
        {
          email,
          password,
        }
      )
      .subscribe(
        (res) => {
          this.token = res['id_token'];
          this.setSession(res['id_token'], res['expires_at']);
          // this.router.navigateByUrl('/');
          window.location.href = '/';
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/']);
        }
      );
  }
  register(body: Record<string, unknown>): Observable<unknown> {
    return this._http.post(environment.api_url + '/users/register', body);
  }

  setSession(token: string, expiry: number): void {
    const expires_at = add(new Date(), { hours: expiry });
    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', JSON.stringify(expires_at));
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/pages/login']);
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    const expiry = JSON.parse(localStorage.getItem('expires_at'));
    if (localStorage.getItem('id_token')) {
      if (isBefore(new Date(), parseJSON(expiry))) {
        return true;
      } else {
        this.logout();
        this.router.navigate(['/pages/login']);
        return false;
      }
    } else {
      this.router.navigate(['/pages/login']);
      return false;
    }
  }
}
