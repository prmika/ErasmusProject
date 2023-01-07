import { TestBed } from '@angular/core/testing';

import { WarehouseService } from './warehouse.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('WarehouseService', () => {
  let service: WarehouseService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
});
    service = TestBed.inject(WarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
