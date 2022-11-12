import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutesComponent } from './warehouse-routes.component';

describe('WarehouseRoutesComponent', () => {
  let component: WarehouseRoutesComponent;
  let fixture: ComponentFixture<WarehouseRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
