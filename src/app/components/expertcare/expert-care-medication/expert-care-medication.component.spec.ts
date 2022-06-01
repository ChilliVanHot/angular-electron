import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpertCareMedicationComponent } from './expert-care-medication.component';

describe('ExpertCareMedicationComponent', () => {
  let component: ExpertCareMedicationComponent;
  let fixture: ComponentFixture<ExpertCareMedicationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertCareMedicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertCareMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
