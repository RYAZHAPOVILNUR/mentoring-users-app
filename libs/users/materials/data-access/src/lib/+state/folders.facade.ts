import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { FoldersModel } from '../../../../folders-model';


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly errors$ = this.store.pipe(select(FoldersSelectors.selectFoldersError));
  public readonly openedFolders$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder))

  addFolder(folder: FoldersModel) {
    this.store.dispatch(FoldersActions.addFolder({ folder }));
  }

  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

}
