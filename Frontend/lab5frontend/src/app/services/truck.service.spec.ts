import { TestBed } from '@angular/core/testing';

import { TruckService } from './truck.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('TruckService', () => {
  let service: TruckService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
});
    service = TestBed.inject(TruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
