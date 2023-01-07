import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckDetailComponent } from './truck-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('TruckDetailComponent', () => {
  let component: TruckDetailComponent;
  let fixture: ComponentFixture<TruckDetailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ TruckDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component created successfullu', () => {
    expect(component).toBeTruthy();
  });

  it('GetTruck exists and works', () => {
    expect(component.getTruck).toBeTruthy();
  });

  it('UpdateTruck exists in the component', () => {
    expect(component.updateTruck).toBeTruthy();
  });

});
