import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { materialsFoldersEffects } from './folders.effects';

describe('materialsFoldersEffects', () => {
  let actions$: Observable<any>;
  let effects: materialsFoldersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [materialsFoldersEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(materialsFoldersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
