import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FoldersActions from './folders.actions';
import { FoldersEffects } from './folders.effects';

describe('FoldersEffects', () => {
  let actions: Observable<Action>;
  let effects: FoldersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FoldersEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(FoldersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FoldersActions.initFolders() });

      const expected = hot('-a-|', { a: FoldersActions.loadFoldersSuccess({ folders: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
