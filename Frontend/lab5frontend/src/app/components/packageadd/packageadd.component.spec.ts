import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageaddComponent } from './packageadd.component';

describe('PackageaddComponent', () => {
  let component: PackageaddComponent;
  let fixture: ComponentFixture<PackageaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
