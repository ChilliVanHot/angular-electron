import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSuccessModalComponent } from './save-success-modal.component';

describe('SaveSuccessModalComponent', () => {
  let component: SaveSuccessModalComponent;
  let fixture: ComponentFixture<SaveSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSuccessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
