import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ang-auth';
  authService = inject(AuthService);
  isLogged = false;
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.isLogged = false;
  }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();

    this.router.events.subscribe((_event) => {
      this.isLogged = this.authService.isLogged();
    });
  }
}
