import { TestBed } from '@angular/core/testing';

import { WarehouseRouteService } from './warehouse-route.service';

describe('WarehouseRouteService', () => {
  let service: WarehouseRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
