import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: any;
  authService = inject(AuthService);
  router = inject(Router);
  cookies = inject(CookieService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    if (!this.loginForm.valid) {
      console.log('Invalid form');

      return;
    }

    console.log(this.loginForm.value);

    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe((data) => {
        console.log(data);

        this.cookies.set('accessToken', data.accessToken);

        this.router.navigate(['/profile']);
      });
  }
}
