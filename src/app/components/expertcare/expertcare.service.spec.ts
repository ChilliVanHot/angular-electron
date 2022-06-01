import { TestBed } from '@angular/core/testing';

import { ExpertcareService } from './expertcare.service';

describe('ExpertcareService', () => {
  let service: ExpertcareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertcareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
