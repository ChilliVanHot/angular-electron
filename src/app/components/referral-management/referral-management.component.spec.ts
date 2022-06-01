import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferralManagementComponent } from './referral-management.component';

describe('ReferralManagementComponent', () => {
  let component: ReferralManagementComponent;
  let fixture: ComponentFixture<ReferralManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
