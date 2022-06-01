import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpertcareIframeComponent } from './expertcare-iframe.component';

describe('ExpertcareIframeComponent', () => {
  let component: ExpertcareIframeComponent;
  let fixture: ComponentFixture<ExpertcareIframeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertcareIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertcareIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
