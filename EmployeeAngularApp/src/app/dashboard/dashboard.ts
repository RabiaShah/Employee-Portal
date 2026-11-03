import { Component, Output, EventEmitter, inject, OnInit} from '@angular/core';
import { AuthService } from '../services/auth/auth';
import { Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{

auth = inject(AuthService);
router = inject(Router);
isCollapsed = false;
isLogoutConfirm = false;
user :string | null = "";

ngOnInit(): void {
  this.user = this.auth.getUser();
  }
 
  /** Emits true when collapsed, so the parent layout can react if it needs to. */
  @Output() collapsedChange = new EventEmitter<boolean>();
 
  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

askLogout(){
  this.isLogoutConfirm = true;
}

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
