import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { Observable, of } from 'rxjs';
import { FoldersErrors } from './folders.reducer';
import { AddFolderDTO } from '../../folders-dto/folders-dto.models';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly filtredFolders$ = this.store.select(FoldersSelectors.selectFiltredFolders);
  public readonly openedFolder$ = this.store.select(FoldersSelectors.selectOpenedFolder);
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus || of(null)));
  public readonly allFolders = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(
    select(FoldersSelectors.selectFoldersError)
  );

  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  addFolder(folderData: AddFolderDTO) {
    this.store.dispatch(FoldersActions.addFolder({ folderData }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  selectedFolder(id: number) {
    this.store.dispatch(FoldersActions.selectFolder({ id }));
  }
}
