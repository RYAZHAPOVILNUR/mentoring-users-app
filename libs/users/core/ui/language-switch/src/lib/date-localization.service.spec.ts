import { TestBed } from '@angular/core/testing';

import { DateLocalizationService } from './date-localization.service';

describe('DateLocalizationService', () => {
  let service: DateLocalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateLocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
