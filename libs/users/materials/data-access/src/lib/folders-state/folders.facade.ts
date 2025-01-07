import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as FoldersActions from 'libs/users/materials/data-access/src/lib/folders-state/folders.actions';
import * as FoldersFeature from 'libs/users/materials/data-access/src/lib/folders-state/folders.reducer';
import * as FoldersSelectors from 'libs/users/materials/data-access/src/lib/folders-state/folders.selectors';

@Injectable()
export class FoldersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FoldersSelectors.selectFoldersLoaded));
  allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }
}
