import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError, retry, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user: any;
  authService = inject(AuthService);
  router = inject(Router);
  cookies = inject(CookieService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('a', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    if (!this.loginForm.valid) {
      alert('Invalid form');

      return;
    }

    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .pipe(retry(3))
      .subscribe({
        error: ({ error }) => {
          this.toastr.error(error.message);
        },
        next: (data) => {
          this.cookies.set('access-token', data.accessToken);
          this.router.navigate(['/']);
        },
      });
  }
}
