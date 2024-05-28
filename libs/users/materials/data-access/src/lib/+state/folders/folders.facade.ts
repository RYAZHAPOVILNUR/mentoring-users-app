import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { FoldersActions } from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { CreateFolderDTO } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.select(
    FoldersSelectors.selectFolders
  );
  public readonly selectStatus$ = this.store.select(
    FoldersSelectors.selectFoldersStatus
  );
  public readonly selectErrors$ = this.store.select(
    FoldersSelectors.selectFolderErrors
  );
  
  public init() {
    this.store.dispatch(FoldersActions.initFolders());
  }
  public addFolder(folder: CreateFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folder }));
  }
  public removeFolder(id: number) {
    this.store.dispatch(FoldersActions.removeFolder({ id }));
  }
  public getFolder() {
    this.store.dispatch(FoldersActions.getFolder());
  }
}
