import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutesaddComponent } from './warehouse-routesadd.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('WarehouseRoutesaddComponent', () => {
  let component: WarehouseRoutesaddComponent;
  let fixture: ComponentFixture<WarehouseRoutesaddComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ WarehouseRoutesaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseRoutesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
