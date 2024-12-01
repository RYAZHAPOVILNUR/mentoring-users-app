import { TestBed } from '@angular/core/testing';

import { TimerServiceService } from './timer-service.service';

describe('TimerServiceService', () => {
  let service: TimerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
