import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css']
})

export class App {
  //protected readonly title = signal('EmployeeAngularApp');

 isCollapsed = false;
 
  /** Emits true when collapsed, so the parent layout can react if it needs to. */
  @Output() collapsedChange = new EventEmitter<boolean>();
 
  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }
}
