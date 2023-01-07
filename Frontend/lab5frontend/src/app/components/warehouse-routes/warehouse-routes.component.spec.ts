import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutesComponent } from './warehouse-routes.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('WarehouseRoutesComponent', () => {
  let component: WarehouseRoutesComponent;
  let fixture: ComponentFixture<WarehouseRoutesComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ WarehouseRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
