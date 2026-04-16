import { HttpInterceptorFn,HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError,throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.getItem('accessToken');

  let  authreq = req;

  if(accessToken) {
    authreq = req.clone({headers:req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
  }
  return next(authreq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}
