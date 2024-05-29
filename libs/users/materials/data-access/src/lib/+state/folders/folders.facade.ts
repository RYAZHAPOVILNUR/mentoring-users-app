import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { foldersActions } from './folders.actions';
import { TFolderCreate, TFolderDTO } from '../../models/folders/folder-data.models';
import * as FoldersSelectors from './folders.selectors';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(FoldersSelectors.selectAllFolders);
  public readonly status$ = this.store.select(FoldersSelectors.selectFoldersStatus);
  public readonly error$ = this.store.select(FoldersSelectors.selectFoldersError);

  loadFolders(): void {
    this.store.dispatch(foldersActions.loadFolders());
  }

  createFolder(folderTitle: TFolderCreate): void {
    this.store.dispatch(foldersActions.createFolder({ folderTitle }));
  }

  deleteFolder(folder: TFolderDTO): void {
    this.store.dispatch(foldersActions.deleteFolder({ folder }));
  }
}
