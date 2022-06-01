import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutWarningModalComponent } from './logout-warning-modal.component';

describe('LogoutWarningModalComponent', () => {
  let component: LogoutWarningModalComponent;
  let fixture: ComponentFixture<LogoutWarningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutWarningModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
