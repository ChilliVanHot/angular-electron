import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetSecurityComponent } from './forget-security.component';

describe('ForgetSecurityComponent', () => {
  let component: ForgetSecurityComponent;
  let fixture: ComponentFixture<ForgetSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
