import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  email: string;
  username: string;
}
export interface AuthResponse {
access: string;
refresh: string;
user: User;
}

export interface OtpResponse {
message: string;
email: string;
}
export interface MessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getInitialUser());
  public currentUser$ : Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {}
  
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, { username, password }).pipe(
      tap(response => this.setSession(response, rememberMe))
    );
  }
  register(username: string, email: string, password: string,rememberMe: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, { username, email, password }).pipe(  
      tap(response => this.setSession(response, rememberMe))
    );
  }
  logout(): void {
    localStorage.clear();  
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró el token de refresco');
    }
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        this.setItem('accessToken', response.access);
      })
    );
  }
  private setSession(authRes: AuthResponse,rememberMe: boolean):void{
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('accessToken', authRes.access);
    storage.setItem('refreshToken', authRes.refresh);
    storage.setItem('currentUser', JSON.stringify(authRes.user));

    sessionStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    this.currentUserSubject.next(authRes.user);

  }
  private getInitialUser():User | null {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal) {
      return JSON.parse(userLocal) as User;
    }
    const userSession = sessionStorage.getItem('currentUser');
    if (userSession) {
      return JSON.parse(userSession) as User;
    }
    return null;
  }
  public getItem(key: string): string | null {
    const rememberMe = JSON.parse(sessionStorage.getItem('rememberMe') || 'false');
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.getItem(key);
  }
  private setItem(key: string, value: string): void {
    const rememberMe = JSON.parse(sessionStorage.getItem('rememberMe') || 'false');
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(key, value);
  }
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/`);
  }
  requestOtp(email: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/password-reset/`, { email });
  }
  resetPassword(email: string, otp_code: string, new_password: string): Observable<MessageResponse> {
    const body = { email, otp_code, new_password };
    return this.http.post<MessageResponse>(`${this.apiUrl}/password-reset/confirm/`, body);
  }
}

