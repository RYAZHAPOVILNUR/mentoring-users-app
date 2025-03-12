import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { CreateFolderDTO } from '../../models/folders.models';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private store = inject(Store);

  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectEntity));
  public readonly openedFolder$ = this.store.select(FoldersSelectors.selectOpenedFolder);
  public readonly errors$ = this.store.pipe(select(FoldersSelectors.selectFoldersError));

    init() {
      this.store.dispatch(FoldersActions.initFolders());
    }

    addFolder(folderData: CreateFolderDTO) {
      this.store.dispatch(FoldersActions.addFolder({ folderData }));
    }
    
    deleteFolder(id: number) {
      this.store.dispatch(FoldersActions.deleteFolder({ id }));
    }

    openedFolder(id: number) {
      this.store.dispatch(FoldersActions.openFolder({ id }));
    }
}
