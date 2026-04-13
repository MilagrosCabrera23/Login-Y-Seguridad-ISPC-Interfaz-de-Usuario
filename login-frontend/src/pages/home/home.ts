import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService, User } from '../../app/core/services/auth';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  private authService =  inject(AuthService);
  private router =  inject(Router);

  user$: Observable<User | null> = this.authService.currentUser$;
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
