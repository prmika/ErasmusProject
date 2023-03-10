import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDetailComponent } from './delivery-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('DeliveryDetailComponent', () => {
  let component: DeliveryDetailComponent;
  let fixture: ComponentFixture<DeliveryDetailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DeliveryDetailComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component created successffully', () => {
    expect(component).toBeTruthy();
  });

  it('GetDelivery exists and works', () => {
    expect(component.getDelivery).toBeTruthy();
  });

  it('UpdateDelivery exists and works', () => {
    expect(component.updateDelivery).toBeTruthy();
    fixture.detectChanges();
    expect(component.successnotificationHidden).toBeTrue();
  });
});
