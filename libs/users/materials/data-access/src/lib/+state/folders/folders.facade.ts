import { inject, Injectable } from '@angular/core';
import * as FoldersSelector from './folders.selectors';
import { select, Store } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
import { AddFolderDTO } from '../../models/folder.model';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(FoldersSelector.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelector.selectFolders));
  public readonly errors$= this.store.pipe(select(FoldersSelector.selectFoldersError));

  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }
  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }))
  }

  addFolder(folder: AddFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folder }))
  }
}
