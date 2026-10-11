import { Component,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,
  styleUrls: ['./home.css'],
  templateUrl: './home.html',
})
export class Home {
  constructor(private router: Router) { }

  Users() {
    this.router.navigate(['/users']);
  }

  Designations() {
    this.router.navigate(['/designations']);
  }
  Departments() {
    this.router.navigate(['/departments']);
  }

}
