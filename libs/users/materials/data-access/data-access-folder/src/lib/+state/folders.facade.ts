import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { foldersActions } from './folders.actions';
import * as foldersSelectors from './folders.selectors';
import { CreateFolder } from '../interfaces/create-folder.interface';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(foldersSelectors.selectAllFolders);
  public readonly status$ = this.store.select(foldersSelectors.selectPublishStatus);
  public readonly openedFolder$ = this.store.select(foldersSelectors.selectOpenedMaterials);

  loadOpenedFolder() {
    this.store.dispatch(foldersActions.getFolderForMaterials());
  }

  publishFolder(folder: CreateFolder) {
    this.store.dispatch(foldersActions.publishFolder({ folder }));
  }

  loadFolders() {
    this.store.dispatch(foldersActions.loadFolders());
  }

  deleteFolder(folderId: number) {
    this.store.dispatch(foldersActions.deleteFolder({ folderId }));
  }
}
