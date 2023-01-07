import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDetailComponent } from './warehouse-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('WarehouseDetailComponent', () => {
  let component: WarehouseDetailComponent;
  let fixture: ComponentFixture<WarehouseDetailComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ WarehouseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('Functions concerning warehouses exist', () => {
    expect(component.getWarehouse).toBeTruthy();
    expect(component.updateWarehouse).toBeTruthy();
    fixture.detectChanges();
  });
});
