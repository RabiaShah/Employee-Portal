import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
isCollapsed = false;
 
  /** Emits true when collapsed, so the parent layout can react if it needs to. */
  @Output() collapsedChange = new EventEmitter<boolean>();
 
  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }
}
