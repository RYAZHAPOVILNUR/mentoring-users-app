import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { foldersActions } from './folders.actions';
import * as foldersSelectors from './folders.selectors';
import { CreateFolder, Folder } from '../interfaces/create-folder.interface';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(foldersSelectors.selectAllFolders);

  public readonly status$ = this.store.select(foldersSelectors.selectStatus);

  public readonly openedFolder$: Observable<Folder | null> = this.store
    .select(foldersSelectors.selectOpenedMaterials)
    .pipe(
      map((folder) => {
        if (!folder) {
          this.store.dispatch(foldersActions.getFolderForMaterials());
        }
        return folder;
      }),
    );

  publishFolder(folder: CreateFolder) {
    this.store.dispatch(foldersActions.publishFolder({ folder }));
  }

  loadFolders() {
    this.store.dispatch(foldersActions.loadFolders());
  }

  deleteFolder(folder_id: number) {
    this.store.dispatch(foldersActions.deleteFolder({ folder_id }));
  }
}
