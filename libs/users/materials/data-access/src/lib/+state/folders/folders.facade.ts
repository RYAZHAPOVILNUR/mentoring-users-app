import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICreateFolder } from '../../models/folders-model';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly errors$ = this.store.pipe(select(FoldersSelectors.selectFoldersError));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly openedFolders$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder));
  public readonly openedFoldersTitle$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolderTitle));

  addFolder(folder: ICreateFolder) {
    this.store.dispatch(FoldersActions.addFolder({ folder }));
  }
  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }
  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }
  openedFolder(id: number) {
    this.store.dispatch(FoldersActions.openFolder({ id }));
  }
}
