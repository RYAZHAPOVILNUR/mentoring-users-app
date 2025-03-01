import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import { MaterialsEffects } from './materials.effects';

describe('MaterialsEffects', () => {
  let actions: Observable<Action>;
  let effects: MaterialsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MaterialsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(MaterialsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MaterialsActions.initMaterials() });

      const expected = hot('-a-|', { a: MaterialsActions.loadMaterialsSuccess({ materials: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
