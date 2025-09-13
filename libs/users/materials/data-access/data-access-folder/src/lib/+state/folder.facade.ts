import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { folderActions } from './folder.actions';
import * as foldersSelectors from './folder.selectors';
import { CreateFolderDTO } from '../types/create-folder-dto.type';

@Injectable({ providedIn: 'root' })
export class FolderFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(foldersSelectors.selectAllFolders);
  public readonly status$ = this.store.select(foldersSelectors.status);
  public readonly currentFolder$ = this.store.select(foldersSelectors.selectCurrentFolder);

  loadFolder() {
    this.store.dispatch(folderActions.loadFolderById());
  }

  addFolder(folder: CreateFolderDTO) {
    this.store.dispatch(folderActions.addFolder({ folder }));
  }

  loadFolders() {
    this.store.dispatch(folderActions.loadFolders());
  }

  deleteFolder(folderId: number) {
    this.store.dispatch(folderActions.deleteFolder({ folderId }));
  }
}
