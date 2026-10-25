import { Component, OnInit, signal} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/Users';
import {Designation} from '../models/Designations';

 

@Component({
  selector: 'app-users',
  standalone: false,
  styleUrls: ['./users.css'],
  templateUrl: './users.html',
})
export class Users implements OnInit{

  private apiUrl = 'http://localhost:5171/api';
  data = signal<any[]>([]);
  searchTerm = '';

  showForm = false;
  isEditing = false;
  formUser: User = this.emptyUser();
  userToDelete: User | null = null;

  successMessage = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;
 
  departments : any[] = [];
  designations : any[] = [];

constructor(private http: HttpClient) {}

ngOnInit() {
  this.getUsers();
  this.getDepartments();
  this.getDesignations();
}

 

  getDepartments() {
    this.http.get<any[]>(`${this.apiUrl}/Departments/GetDepartments`).subscribe({
      next: (data) => {
        this.departments = data;
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
      this.designations = data;
    },
    error: (error) => {
      console.error('GET Error', error);
    }
  });
}

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
 
  trackById(_: number, user: User): number  {
    return user.id;
  }
 
  openAdd(): void {
    this.isEditing = false;
    this.formUser = this.emptyUser();
    this.showForm = true;
  }
 
  openEdit(user: User): void {
    this.isEditing = true;
    this.formUser = { ...user }; 
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
      this.http.put<any>(`${this.apiUrl}/Users/UpdateUser`,this.formUser).subscribe({
        next: (data) => {
          this.showSuccess("User updated successfully.");
          this.getUsers();
        },
        error: (error) => {
          console.log(error.error);
        }
      });
    } else {
      this.http.post<any>(`${this.apiUrl}/Users/AddUser`,this.formUser).subscribe({
        next: (data) => {
          this.showSuccess("User added successfully.");
          this.getUsers();
        },
        error: (error) => {
          console.log(error.error);
        }
      });
    }
    this.closeForm();
  }
 
  askDelete(user: User): void {
    this.userToDelete = user;
  }
 
  confirmDelete(): void {
    if (this.userToDelete) {
      this.http.delete<any>(`${this.apiUrl}/Users/DeleteUser/${this.userToDelete.id}`).subscribe({
        next: (data) => {
          this.showSuccess("User deleted successfully.");
          this.getUsers();
        },
        error: (error) => {
          console.log(error.error);
        }
      });
      this.userToDelete = null;
    }
  }
 
  private emptyUser(): User {
    return { id: 0, firstName: '', lastName: '', phone: null, address: null, deptId: 1, desigId: 1, isActive: true, department: null, designation: null};
  }

  showSuccess(message: string): void {
    clearTimeout(this.toastTimer);              
    this.successMessage.set(message);
    this.toastTimer = setTimeout(() => this.successMessage.set(''), 3000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer);
  }
}
