import { TestBed } from '@angular/core/testing';

import { WarehouseRouteService } from './warehouse-route.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('WarehouseRouteService', () => {
  let service: WarehouseRouteService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      });
    service = TestBed.inject(WarehouseRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
