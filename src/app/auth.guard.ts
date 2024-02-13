import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('AuthGuard');


  if (!authService.isLogged()) {
    console.log('Not logged');

    router.navigate(['/login']);
    return false;
  }

  console.log('Logged');

  return true;
};
