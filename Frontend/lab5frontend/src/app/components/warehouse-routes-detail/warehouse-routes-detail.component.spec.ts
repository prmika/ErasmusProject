import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutesDetailComponent } from './warehouse-routes-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('WarehouseRoutesDetailComponent', () => {
  let component: WarehouseRoutesDetailComponent;
  let fixture: ComponentFixture<WarehouseRoutesDetailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ WarehouseRoutesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseRoutesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
