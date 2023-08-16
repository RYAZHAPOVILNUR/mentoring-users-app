import { TestBed } from '@angular/core/testing';

import { ThemeSwitchService } from './theme-switch.service';

describe('ThemeSwitchService', () => {
  let service: ThemeSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
