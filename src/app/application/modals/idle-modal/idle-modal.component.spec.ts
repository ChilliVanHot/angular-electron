import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleModalComponent } from './idle-modal.component';

describe('IdleModalComponent', () => {
  let component: IdleModalComponent;
  let fixture: ComponentFixture<IdleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
