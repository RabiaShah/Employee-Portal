import { Component, OnInit, signal} from '@angular/core';
import { Department } from '../models/Departments';
import { HttpClient } from '@angular/common/http';
import { Designation } from '../models/Designations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-designations',
  standalone: false,
  styleUrls: ['./designations.css'],
  templateUrl: './designations.html',
})
export class Designations implements OnInit{

  private apiUrl = 'http://localhost:5171/api';
  data = signal<Designation[]>([]);

  searchTerm = '';
  showForm = false;
  isEditing = false;
  formUser: Designation= this.emptyDesig();
  desigToDelete: Designation| null = null;
  departments : any[] = [];

  successMessage = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDepartments();
    this.getDesignations();
  }

  getDesignations() {
    this.http.get<Designation[]>(`${this.apiUrl}/Designation/GetDesignations`).subscribe({
      next : data => {
        this.data.set(data);
      },
      error : error => {
        console.error('GET Error:', error);
      }
    });
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

    get filteredDesig(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.data();
    }
    const digits = term.replace(/[\s\-+]/g, '');
    return this.data().filter(
      (u) => 
        u.deptName?.toLowerCase().includes(term)  || u.desigName?.toLowerCase().includes(term)
    );
  }
 
  trackById(_: number, desig: Designation): number  {
    return desig.desigId;
  }
 
  openAdd(): void {
    this.isEditing = false;
    this.formUser = this.emptyDesig();
    this.showForm = true;
  }
 
  openEdit(user: Designation): void {
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
      this.http.put<any>(`${this.apiUrl}/Designation/UpdateDesignation`,this.formUser).subscribe({
        next: (data) => {
          this.showSuccess("Designation updated successfully.");
          this.getDesignations();
        },
        error: (error) => {
          console.log(error.error);
        }
      });
    } else {
      this.http.post<any>(`${this.apiUrl}/Designation/AddDesignation`,this.formUser).subscribe({
        next: (data) => {
          this.showSuccess('Designation added successfully.');
          this.getDesignations();
        },
        error: (error) => {
          console.log(error.error);
        }
      });
    }
    this.closeForm();
  }
 
  askDelete(user: Designation): void {
    this.desigToDelete = user;
  }
 
  confirmDelete(): void {
    if (this.desigToDelete) {
      this.http.delete<any>(`${this.apiUrl}/Designation/DeleteDesignation/${this.desigToDelete.desigId}`).subscribe({
        next: (data) => {
          this.showSuccess("Designation deleted successfully.");
          this.getDesignations();
        },
        error: (error) => {
          console.log(error.error);
        }
      });
      this.desigToDelete = null;
    }
  }

   private emptyDesig(): Designation {
     return { deptId: 1, deptName: '', desigName: null, desigId: 0, users: []};;
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
