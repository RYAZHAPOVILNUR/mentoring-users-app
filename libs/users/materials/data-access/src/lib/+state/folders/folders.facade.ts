import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as FoldersSelectors from '../folders/folders.selectors';
import { MaterialsFoldersAction } from './folders.actions';
import { FolderCreate } from '../../models/folders.interface';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  constructor(private store: Store) {}

  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly error$ = this.store.pipe(select(FoldersSelectors.selectFoldersError));

  public load() {
    this.store.dispatch(MaterialsFoldersAction.loadFolders());
  }
  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsFoldersAction.deleteFolder({ id }));
  }

  public createFolder(title: FolderCreate) {
    this.store.dispatch(MaterialsFoldersAction.createFolder({ title }));
  }
}
