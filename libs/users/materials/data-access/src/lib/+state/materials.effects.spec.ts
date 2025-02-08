import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { MaterialsEffects } from './materials.effects';

describe('MaterialsEffects', () => {
  let actions$: Observable<any>;
  let effects: MaterialsEffects;

  beforeEach(() => {
    actions$ = of(); // Initialize actions$ with empty observable
    TestBed.configureTestingModule({
      providers: [MaterialsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(MaterialsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
