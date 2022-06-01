import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpertCareDetailComponent } from './expert-care-detail.component';

describe('ExpertCareDetailComponent', () => {
  let component: ExpertCareDetailComponent;
  let fixture: ComponentFixture<ExpertCareDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertCareDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertCareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
