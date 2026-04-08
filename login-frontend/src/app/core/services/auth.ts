import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  public currentUser$ : Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}
  
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}

