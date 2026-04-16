import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth';

export const publicGuard : CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = !!authService.currentUserValue || localStorage.getItem('accessToken');

  if(isAuthenticated){
    console.log('Usuario autenticado, redirigiendo a /home');
    router.navigate(['/home']);
    return false;
  }
  return true;
};
