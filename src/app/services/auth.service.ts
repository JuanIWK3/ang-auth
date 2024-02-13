import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private router = inject(Router);
  private api = 'http://localhost:6969/api';

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/auth/signup`, {
      email,
      password,
    });
  }

  login(email: string, password: string, callbackUrl?: string) {
    if (!callbackUrl) {
      callbackUrl = '/';
    }

    return this.http.post<{ accessToken: string }>(`${this.api}/auth/signin`, {
      email,
      password,
    });
  }

  isLogged(): boolean {
    return !!this.cookies.get('access-token');
  }

  logout(): void {
    this.cookies.delete('access-token');
    this.router.navigate(['/login']);
  }

  getProfile(): any {
    return this.http.get(`${this.api}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });
  }
}
