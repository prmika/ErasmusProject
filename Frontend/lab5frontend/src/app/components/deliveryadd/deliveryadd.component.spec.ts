import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryaddComponent } from './deliveryadd.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('DeliveryaddComponent', () => {
  let component: DeliveryaddComponent;
  let fixture: ComponentFixture<DeliveryaddComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      declarations: [DeliveryaddComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('Function addDelivery exists and works', () => {
    expect(component.addDelivery).toBeTruthy();
    expect(component.deliveryWasSuccessfullyAddedHidden).toBeTrue();
  });
});
