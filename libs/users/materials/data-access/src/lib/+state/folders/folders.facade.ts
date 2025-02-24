import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions'
import * as FoldersSelectors from './folders.selectors';
import { CreateFolderDTO } from '../../../../../../../core/data-access/src';


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
    console.log(folderData)
    this.store.dispatch(FoldersActions.addFolder({folder: folderData}));
  }
}
