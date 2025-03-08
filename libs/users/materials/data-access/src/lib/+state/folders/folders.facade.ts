import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions'
import * as FoldersSelectors from './folders.selectors';
import { CreateFolderDTO } from '../../../../../../../core/data-access/src';
import * as UsersActions from '../../../../../../users/data-access/src/lib/+state/users.actions';


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);


  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly error$ = this.store.pipe(select(FoldersSelectors.selectFoldersError));

  init(){
    this.store.dispatch(FoldersActions.initFolders())
  }

  addFolder(folderData: CreateFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({folder: folderData}));
  }

  deleteFolder(folderId: number) {
    this.store.dispatch(FoldersActions.deleteFolder({folderId: folderId}));
  }

  loadFolder() {
    this.store.dispatch(FoldersActions.loadFolder());
  }
}
