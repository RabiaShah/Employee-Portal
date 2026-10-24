import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/Users';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5171/api/Users'; // change to your API URL

  profile = signal<User| null>(null);
  isLoading = signal(true);
  isEditing = signal(false);
  isSaving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  // Only the editable fields live in the form
  form = { phone: '', address: '' };

  initials = computed(() => {
    const p = this.profile();
    return p ? `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase() : '';
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.http.get<any>(`${this.apiUrl}/GetProfile`).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Profile load error:', err);
        this.errorMessage.set('Could not load your profile.');
        this.isLoading.set(false);
      },
    });
  }

  startEdit(): void {
    const p = this.profile();
    if (!p) return;
    this.form = { phone: p.phone?.toString() ?? '', address: p.address ?? '' };
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isEditing.set(true);
  }

  cancel(): void {
    this.isEditing.set(false);
    this.errorMessage.set('');
  }

  save(f: NgForm): void {
    if (f.invalid) return;

    const payload = {
      phone: this.form.phone.trim() || null,
      address: this.form.address.trim() || null,
    };

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.http.put(`${this.apiUrl}/UpdateProfile`, payload).subscribe({
      next: () => {
        // Update the view with the saved values
        //this.profile.update((p) => (p ? { ...p, ...payload } : p));
        this.isSaving.set(false);
        this.isEditing.set(false);
        this.successMessage.set('Profile updated successfully.');
      },
      error: (err) => {
        console.error('Profile update error:', err);
        this.errorMessage.set('Could not save your changes. Please try again.');
        this.isSaving.set(false);
      },
    });
  }
}
