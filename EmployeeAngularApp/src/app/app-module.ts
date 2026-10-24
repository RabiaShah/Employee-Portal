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
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth/auth.interceptor';

@NgModule({
  declarations: [App, Users, Designations, Departments, Home, Dashboard, Login, Profile],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [App],
})
export class AppModule {}
