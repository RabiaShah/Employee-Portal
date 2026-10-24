import { Component, Output, EventEmitter, inject } from '@angular/core';
import { AuthService } from '../app/services/auth/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css']
})

export class App {

  isCollapsed = false;
  auth = inject(AuthService);
  
  @Output() collapsedChange = new EventEmitter<boolean>();
 
  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }
}
