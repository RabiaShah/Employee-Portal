import { Component, OnInit, signal} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/Users';
import {Designation} from '../models/Designations';

 
export interface users {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
}

@Component({
  selector: 'app-users',
  standalone: false,
  styleUrls: ['./users.css'],
  templateUrl: './users.html',
})
export class Users implements OnInit{

private apiUrl = 'http://localhost:5171/api';
data = signal<any[]>([]);

constructor(private http: HttpClient) {}

ngOnInit() {
  this.getUsers();
  this.getDepartments();
  this.getDesignations();
}

 searchTerm = '';
 
  showForm = false;
  isEditing = false;
  formUser: users = this.emptyUser();
  userToDelete: users | null = null;
 
  departments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales'];
  designations = ['Intern', 'Associate', 'Senior Associate', 'Manager', 'Director'];

  dept : any[] = [];
  design : any[] = [];

  getDepartments() {
    this.http.get<any[]>(`${this.apiUrl}/Departments/GetDepartments`).subscribe({
      next: (data) => {
        this.dept = data;
      },
      error: (error) => {
        console.error('GET Error:', error);
      }
    });

 }

getUsers() {
  this.http.get<any[]>(`${this.apiUrl}/Users/GetUsersAsync`).subscribe({
      next: (data) => {
        this.data.set(data);
      },
      error: (error) => {
        console.error('GET Error:', error);
      }
    });
}

getDesignations() {

  this.http.get<any[]>(`${this.apiUrl}/Designation/GetDesignations`).subscribe({
    next: (data) => {
      this.design = data;
    },
    error: (error) => {
      console.error('GET Error', error);
    }
  });
}

  // Filters by name OR phone number
  get filteredUsers(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.data();
    }
    const digits = term.replace(/[\s\-+]/g, '');
    return this.data().filter(
      (u) => 
        u.firstName.toLowerCase().includes(term) || u.lastName.toLowerCase().includes(term)
    );
  }
 
  trackById(_: number, user: users): number {
    return user.id;
  }
 
  openAdd(): void {
    this.isEditing = false;
    this.formUser = this.emptyUser();
    this.showForm = true;
  }
 
  openEdit(user: users): void {
    this.isEditing = true;
    this.formUser = { ...user }; // copy so cancelling doesn't change the row
    this.showForm = true;
  }
 
  closeForm(): void {
    this.showForm = false;
  }
 
  save(form: NgForm): void {
    if (form.invalid) {
      return;
    }
 
    if (this.isEditing) {
      // TODO: call your API here, e.g. this.userService.update(this.formUser)
      this.data.set( this.data().map((u) => (u.id === this.formUser.id ? { ...this.formUser } : u)));
    } else {
      // TODO: call your API here, e.g. this.userService.create(this.formUser)
      const nextId = this.data().length ? Math.max(...this.data().map((u) => u.id)) + 1 : 1;
      this.data.set([...this.data(), { ...this.formUser, id: nextId }]);
    }
    this.closeForm();
  }
 
  askDelete(user: users): void {
    this.userToDelete = user;
  }
 
  confirmDelete(): void {
    if (this.userToDelete) {
      // TODO: call your API here, e.g. this.userService.delete(this.userToDelete.id)
      const id = this.userToDelete.id;
      this.data.set(this.data().filter((u) => u.id !== id));
      this.userToDelete = null;
    }
  }
 
  private emptyUser(): users {
    return { id: 0, name: '', email: '', phone: '', department: 'Engineering', designation: 'Associate' };
  }
}
