import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: any;
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  register() {
    console.log(this.registerForm.value);

    const { email, password } = this.registerForm.value;

    if (!email || !password) {
      return;
    }

    this.authService.register(email, password).subscribe((data) => {
      console.log(data);

      if (data.msg) {
        alert(data.msg);
      }

      if (data.user) {
        this.router.navigate(['/login']);
      }
    });
  }
}
