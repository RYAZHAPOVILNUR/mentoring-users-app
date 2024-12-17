import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './folders.selectors';
import { IAddFolder } from '../models/folder-add.model';
import { FoldersActions } from './folders.actions';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));

  public readonly foldersStatus$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));

  public readonly openedFolder$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder));

  public loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  public addFolder(folder: IAddFolder) {
    this.store.dispatch(FoldersActions.addFolder({ folder }));
  }

  public deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }
}
