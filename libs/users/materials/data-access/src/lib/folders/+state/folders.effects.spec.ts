import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MaterialsEffects } from './folders.effects';

describe('MaterialsEffects', () => {
  let actions$: Observable<any>;
  let effects: MaterialsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(MaterialsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
