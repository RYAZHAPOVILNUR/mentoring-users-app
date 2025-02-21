import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot } from 'jasmine-marbles';
import { MaterialsEffects } from './materials.effects';
import { MaterialsActions } from './materials.actions';

describe('MaterialsEffects', () => {
  let actions$: Observable<any>;
  let effects: MaterialsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(MaterialsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: MaterialsActions.initFolders() });

      const expected = hot('-a-|', {
        a: MaterialsActions.loadFoldersSuccess({ folders: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    })
  });
});