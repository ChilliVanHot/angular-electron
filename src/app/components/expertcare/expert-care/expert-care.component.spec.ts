import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpertCareComponent } from './expert-care.component';

describe('ExpertCareComponent', () => {
  let component: ExpertCareComponent;
  let fixture: ComponentFixture<ExpertCareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
