import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckComponent } from './truck.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('TruckComponent', () => {
  let component: TruckComponent;
  let fixture: ComponentFixture<TruckComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ TruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('Array of trucks exists in the component', () => {
    expect(component.trucks).toBeTruthy();
  });

  it('GetTrucks method exists in the component', () => {
    expect(component.getTrucks).toBeTruthy();
  });
});
