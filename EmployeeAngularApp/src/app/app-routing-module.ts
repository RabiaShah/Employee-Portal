import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Users } from './users/users';
import { Designations } from './designations/designations';
import { Departments } from './departments/departments';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'app',
    component: App
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'users',
    component: Users
  },
  {
    path: 'designations',
    component: Designations
  },
  {
    path: 'departments',
    component: Departments
  },
  {
    path: 'login',
    component: Login
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
