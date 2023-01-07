import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesComponent } from './roles.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@auth0/auth0-angular';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RolesComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]

    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
