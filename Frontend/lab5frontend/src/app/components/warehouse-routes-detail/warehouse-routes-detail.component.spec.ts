import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRoutesDetailComponent } from './warehouse-routes-detail.component';

describe('WarehouseRoutesDetailComponent', () => {
  let component: WarehouseRoutesDetailComponent;
  let fixture: ComponentFixture<WarehouseRoutesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
