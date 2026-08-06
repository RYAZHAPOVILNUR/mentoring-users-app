import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateFolder } from '@users/ui-folders';

import { FoldersActions } from './folders.actions';
import { selectFolders, selectFoldersLoadingStatus, selectFolderTitle } from './folders.selectors';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  readonly isLoadingStatus$ = this.store.select(selectFoldersLoadingStatus);
  readonly folders$ = this.store.select(selectFolders);
  readonly folderTitle$ = this.store.select(selectFolderTitle);

  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  createFolder(title: CreateFolder) {
    this.store.dispatch(FoldersActions.createFolder({ title }));
  }
}
