import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpertcareResultsComponent } from './expertcare-results.component';

describe('ExpertcareIframeComponent', () => {
  let component: ExpertcareResultsComponent;
  let fixture: ComponentFixture<ExpertcareResultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertcareResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertcareResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
