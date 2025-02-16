import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { FoldersEffects } from './folders.effects';

describe('FoldersEffects', () => {
  let actions$: Observable<any>;
  let effects: FoldersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoldersEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(FoldersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
