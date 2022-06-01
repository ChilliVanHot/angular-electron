import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintModalComponent } from './print-modal.component';

describe('PrintgModalComponent', () => {
  let component: PrintModalComponent;
  let fixture: ComponentFixture<PrintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
