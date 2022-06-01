import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpertCareClinicalDetailsComponent } from './expert-care-clinical-details.component';

describe('ExpertCareClinicalDetailsComponent', () => {
  let component: ExpertCareClinicalDetailsComponent;
  let fixture: ComponentFixture<ExpertCareClinicalDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertCareClinicalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertCareClinicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
