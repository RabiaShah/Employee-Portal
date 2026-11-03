import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { NgForm } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth';


describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let httpMock: HttpTestingController;
  const loginUrl = 'http://localhost:5171/api/Login/login';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Login],
      imports: [FormsModule], 
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: { login: vi.fn(), setUser: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    vi.spyOn(component.router, 'navigate').mockResolvedValue(true);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return when the form is invalid', () => {
    const form = {invalid: true} as NgForm;
    component.onSubmit(form);
    httpMock.expectNone(loginUrl);
    expect(component.isLoading()).toBe(false);
  });

  it('should submit the form when it is valid', () => {
    const form = {invalid: false} as NgForm;
    component.onSubmit(form);
    expect(component.isLoading()).toBe(true);
    expect(httpMock.expectOne(loginUrl).request.method).toBe('POST');
  });

  it('should handle login', () => {
    const form = {invalid: false} as NgForm;
    component.credentials = { Username: 'john', Password: 'secret' };
    component.onSubmit(form);
    const req = httpMock.expectOne(loginUrl);
    req.flush({ token: 'test-token' });
    expect(component.isLoading()).toBe(false);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ Username: 'john', Password: 'secret' });
  });

  it('should handle login success', () => {
    const form = {invalid: false} as NgForm;
    component.credentials = { Username: 'john', Password: 'secret' };
    component.onSubmit(form);
    const req = httpMock.expectOne(loginUrl);
    req.flush({ token: 'test-token' });
    expect(component.isLoading()).toBe(false);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ Username: 'john', Password: 'secret' });
    expect(component.isLoading()).toBeFalsy();
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(component.auth.login).toHaveBeenCalledWith('test-token', component.rememberMe);
    expect(component.auth.setUser).toHaveBeenCalledWith(undefined);
    expect(component.router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login error', () => {
        const form = {invalid: false} as NgForm;
    component.credentials = { Username: 'john', Password: 'secret' };
    component.onSubmit(form);
    const req = httpMock.expectOne(loginUrl);
    req.flush({ token: 'test-token' });
    expect(component.isLoading()).toBe(false);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ Username: 'john', Password: 'secret' });
    expect(component.isLoading()).toBeFalsy();
    expect(component.errorMessage).toBe('');
  });
});
