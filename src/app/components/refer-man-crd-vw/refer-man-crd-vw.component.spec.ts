import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralManagementCardViewComponent } from './refer-man-crd-vw.component';

describe('ReferralManagementCardViewComponent', () => {
  let component: ReferralManagementCardViewComponent;
  let fixture: ComponentFixture<ReferralManagementCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralManagementCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralManagementCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
