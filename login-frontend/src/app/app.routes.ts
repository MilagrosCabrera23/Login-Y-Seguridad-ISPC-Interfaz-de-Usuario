import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { ForgotPassword } from '../pages//forgot-password/forgot-password';


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPassword },
   { path: '', redirectTo: 'login',pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
