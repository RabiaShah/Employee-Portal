import { Component, inject, signal} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private apiUrl = 'http://localhost:5171/api/Login/login';
 
  credentials = { Username: '', Password: '' };
  rememberMe = false;
  showPassword = false;
  isLoading = signal<boolean>(false);
  errorMessage = '';

  auth = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
 
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';
    this.http.post<any>(`${this.apiUrl}`, this.credentials).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        localStorage.setItem('token', res.token);
        this.auth.login(res.token, this.rememberMe);
        this.auth.setUser(res.user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage =
          err.status === 401 ? 'Invalid username or password.' : 'Unable to sign in. Please try again.';
      },
    });
  }
}
