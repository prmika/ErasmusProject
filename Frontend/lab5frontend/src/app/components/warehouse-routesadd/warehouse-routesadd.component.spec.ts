import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutesaddComponent } from './warehouse-routesadd.component';

describe('WarehouseRoutesaddComponent', () => {
  let component: WarehouseRoutesaddComponent;
  let fixture: ComponentFixture<WarehouseRoutesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
