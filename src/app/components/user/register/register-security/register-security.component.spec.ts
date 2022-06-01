import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSecurityComponent } from './register-security.component';

describe('RegisterSecurityComponent', () => {
  let component: RegisterSecurityComponent;
  let fixture: ComponentFixture<RegisterSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
