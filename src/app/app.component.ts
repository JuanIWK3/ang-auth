import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { switchMap } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf, ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ang-auth';
  authService = inject(AuthService);
  isLogged = false;
  router = inject(Router);
  route = inject(ActivatedRoute);

  logout() {
    this.authService.logout();
    this.isLogged = false;
  }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();

    this.route.url.subscribe((data) => {
      console.log(data);
    });

    this.router.events.subscribe((_event) => {
      this.isLogged = this.authService.isLogged();
    });
  }
}
