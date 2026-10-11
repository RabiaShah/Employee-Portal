import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Users } from './users/users';
import { Designations } from './designations/designations';
import { Departments } from './departments/departments';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';

@NgModule({
  declarations: [App, Users, Designations, Departments, Home, Dashboard],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
