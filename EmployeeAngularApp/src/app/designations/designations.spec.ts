import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Designations } from './designations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('Designations', () => {
  let component: Designations;
  let fixture: ComponentFixture<Designations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Designations],
      imports: [FormsModule, RouterModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Designations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
