import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryaddComponent } from './deliveryadd.component';

describe('DeliveryaddComponent', () => {
  let component: DeliveryaddComponent;
  let fixture: ComponentFixture<DeliveryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
