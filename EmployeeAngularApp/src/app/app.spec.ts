import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { AuthService } from '../app/services/auth/auth';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { FormsModule } from '@angular/forms';

describe('App', () => {

  let isLoggedIn: ReturnType<typeof vi.fn>;
  let fixture: ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        FormsModule
      ],
      declarations: [
        App, Login, Dashboard
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should toggle isCollapsed', () => {
    app.isCollapsed = false;
    app.toggle();
    expect(app.isCollapsed).toBe(true);
    app.toggle();
    expect(app.isCollapsed).toBe(false);
  });

  it('should have auth service injected', () => {
    expect(app.auth).toBeTruthy();
  });

  it('should show login page if the user is not logged in', () => {
    vi.spyOn(app.auth, 'isLoggedIn').mockReturnValue(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-login'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-dashbaord'))).toBeNull();
  });

  it('should show dashboard page if the user is logged in', () => {
    vi.spyOn(app.auth, 'isLoggedIn').mockReturnValue(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.layout'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-dashboard'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-login'))).toBeNull();
  });

});
