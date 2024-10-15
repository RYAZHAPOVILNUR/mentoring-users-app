import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './folders.selectors';
import { FoldersActions } from './folders.actions';
import { IFolder } from '../../models/folder.interface';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(
    FoldersSelectors.selectFoldersStatus)
  );

  public readonly folders$ = this.store.pipe(select(
    FoldersSelectors.selectFolders)
  );

  public readonly error$ = this.store.pipe(select(
      FoldersSelectors.selectFoldersError
    )
  );

  public loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  };

  public addFolder(folder: IFolder) {
    this.store.dispatch(FoldersActions.addFolder({ folder }))
  }

  public deleteFolder(folderId: number): void {
    this.store.dispatch(FoldersActions.deleteFolder({ folderId }));
  }
}
