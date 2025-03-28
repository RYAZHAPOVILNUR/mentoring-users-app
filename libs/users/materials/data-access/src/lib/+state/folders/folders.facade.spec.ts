import { TestBed } from '@angular/core/testing';

import { foldersFacade } from './folders.facade';

describe('FoldersFacade', () => {
  let service: FoldersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoldersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
