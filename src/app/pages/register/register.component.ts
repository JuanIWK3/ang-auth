import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  user: any;
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
    }
  }

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

    this.authService.register(email, password).subscribe({
      error: ({ error }) => {
        this.toastr.error(error.message);
      },
      next: () => {
        this.toastr.success('User registered');
        this.router.navigate(['/login']);
      },
    });
  }
}
