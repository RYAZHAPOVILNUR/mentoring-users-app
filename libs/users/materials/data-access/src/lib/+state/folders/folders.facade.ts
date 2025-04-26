import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as FoldersSelectors from './folders.selectors'
import { folderActions } from './folders.actions';
import { CreateFolder } from '../../models/create-folder.models';
import { FoldersEntity } from '../../models/folders.models';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFolderStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectFolderEntity));
  public readonly openedFolder$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder));

  loadFolders() {
    this.store.dispatch(folderActions.loadFolders());
  }

  loadFolder() {
    this.store.dispatch(folderActions.loadFolder());
  }

  addFolder(folderData: CreateFolder) {
    this.store.dispatch(folderActions.addFolder({ folderData }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(folderActions.deleteFolder({ id }));
  }

  getFolderFromStore(id: number) {
    return this.store.select(FoldersSelectors.selectFolderById(id)).pipe(
      switchMap((folder: FoldersEntity | undefined): Observable<FoldersEntity | null> => {
        if (folder) {
          return of(folder);
        } else {
          return of(null);
        }
      })
    );
  }
}
