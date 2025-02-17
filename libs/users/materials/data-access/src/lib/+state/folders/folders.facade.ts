import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { Observable } from 'rxjs';
import { FoldersErrors } from './folders.reducer';
import { CreateFolderDTO } from '../models/folder-models';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(select(FoldersSelectors.selectFoldersError));
  public readonly openedFolder$ = this.store.select(FoldersSelectors.selectOpenedFolder);

  allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }
  
  addFolder(folder: CreateFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folder }));
  }
  
  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  openedFolder(id: number) {
    this.store.dispatch(FoldersActions.openFolder({ id }));
  }
}