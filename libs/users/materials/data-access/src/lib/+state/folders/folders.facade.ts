import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as FoldersActions from './folders.actions';
import { FoldersErrors } from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersLoaded));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectEntity));
  public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(select(FoldersSelectors.selectFoldersError))
  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initFolders() {
    this.store.dispatch(FoldersActions.initFolders());
  }
}
