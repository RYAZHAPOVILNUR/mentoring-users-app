import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
import * as FoldersFeature from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';
import { Observable } from 'rxjs';
import { FoldersErrors } from './folders.models';
import { FoldersDTO, FoldersEntity } from '@users/core/data-access';

@Injectable({
  providedIn: 'root',
})
export class FoldersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectFolderEntity));
  public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(
    select(FoldersSelectors.selectFoldersError)
  );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  addFolder(folderData: FoldersEntity) {
    this.store.dispatch(FoldersActions.addFolder({ folderData }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  editFolder(folder: FoldersEntity) {
    this.store.dispatch(FoldersActions.editFolderSuccess({ folderData: folder }));
  }
}
