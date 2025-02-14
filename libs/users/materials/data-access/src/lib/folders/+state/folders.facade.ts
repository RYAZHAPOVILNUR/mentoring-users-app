import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateFolderDTO } from '../../models/folders.interface';
import * as FoldersActions from './folders.actions';
import { FoldersErrors } from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly folderStatus$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly folderError$: Observable<FoldersErrors | null> = this.store.pipe(
    select(FoldersSelectors.selectFoldersError)
  );
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly openedFolder$ = this.store.select(FoldersSelectors.selectOpenedFolder);
  public readonly openedFolderTitle$ = this.store.select(FoldersSelectors.selectOpenedFolderTitle);
  public readonly openedFolderId$ = this.store.select(FoldersSelectors.selectOpenedFolderId);

  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  addFolder(folderData: CreateFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folderData }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  loadFolder() {
    this.store.dispatch(FoldersActions.loadFolder());
  }
}
