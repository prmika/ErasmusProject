import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckAddComponent } from './truckadd.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('TruckAddComponent', () => {
  let component: TruckAddComponent;
  let fixture: ComponentFixture<TruckAddComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ TruckAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('There is an option to add a truck', () => {
    expect(component.addTruck).toBeTruthy();
    expect(component.truckWasSuccessfullyAddedHidden).toBeTrue();
  });
});
