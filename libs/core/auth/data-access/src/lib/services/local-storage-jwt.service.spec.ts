import { TestBed } from '@angular/core/testing';

import { LocalStorageJwtService } from './local-storage-jwt.service';

describe('LocalStorageJwtService', () => {
  let service: LocalStorageJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
