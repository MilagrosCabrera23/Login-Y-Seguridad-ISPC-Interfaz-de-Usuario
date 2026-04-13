import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Register } from '../pages/register/register';


export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [publicGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPassword, canActivate: [publicGuard] },
  { path: 'reset-password', component: ResetPassword, canActivate: [publicGuard] },
  { path: 'register', component: Register, canActivate: [publicGuard] },
  { path: '', redirectTo: 'login',pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
