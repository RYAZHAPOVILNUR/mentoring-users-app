import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FoldersSelectors from './folders.selectors';
import { Observable } from 'rxjs';
import { FoldersErrors } from '../../models/folders-error';
import { FoldersEntity } from '@users/core/data-access';
import { foldersActions } from './folders.actions';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.select(
    FoldersSelectors.selectFoldersStatus);
  public readonly allFolders$ = this.store.select(
    FoldersSelectors.selectAllFolders);
  public readonly selectedFolders$ = this.store.select(
    FoldersSelectors.selectEntity);
  public readonly errors$: Observable<FoldersErrors | null> = this.store.select(
    FoldersSelectors.selectFoldersError);

  init() {
    this.store.dispatch(foldersActions.initFolders());
  }

  addFolder(folderData: FoldersEntity) {
    this.store.dispatch(foldersActions.addFolder({ folderData }));
  };

  editFolder(folder: FoldersEntity) {
    this.store.dispatch(foldersActions.editFolder({ folderData: folder }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(foldersActions.deleteFolder({ id }));
  }
}
