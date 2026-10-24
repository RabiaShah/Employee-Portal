import { Service, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly key = 'token';
  isLoggedIn = signal<boolean>(!!this.getToken());

  constructor() { }

  login(token: string, rememberMe: boolean): void {
    (rememberMe) ? localStorage.setItem(this.key, token) : sessionStorage.setItem(this.key, token);
    this.isLoggedIn.set(true);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.key) && sessionStorage.getItem(this.key);
  }

  getUser(): string | null {
    return localStorage.getItem("username");
    }

    setUser(user: string): void { localStorage.setItem("username", user); }

}
