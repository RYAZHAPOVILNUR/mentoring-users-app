import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as folderSelector from './folders.selectors';
import * as folderActions from './folders.actions';
import { FoldersErrors } from './folders.reducer';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly foldersStatus$ = this.store.pipe(select(folderSelector.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(folderSelector.selectAllFolders));
  public readonly selectFolder$ = this.store.pipe(select(folderSelector.selectFoldersEntities));
  public readonly openFolder$ = this.store.pipe(select(folderSelector.selectOpenedFolder));
  public readonly foldersError$: Observable<FoldersErrors | null> = this.store.pipe(
    select(folderSelector.selectFoldersError)
  );

  public init() {
    this.store.dispatch(folderActions.initFolders());
  }

  public deleteFolder(id: number) {
    this.store.dispatch(folderActions.deleteFolder({ id }));
  }

  public addFolder(title: string) {
    this.store.dispatch(folderActions.addFolder({ title }));
  }
}