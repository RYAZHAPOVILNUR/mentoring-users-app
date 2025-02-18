import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { Observable, of, switchMap } from 'rxjs';
import { FoldersErrors } from './folders.reducer';
import { FoldersEntity } from '../../folders-dto/folders.entity';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly filtredFolders$ = this.store.select(FoldersSelectors.selectFiltredFolders);
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus || of(null)));
  public readonly allFolders = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(
    select(FoldersSelectors.selectFoldersError)
  );

  init() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  getFolderFromStore(id: number) {
    return this.store.select(FoldersSelectors.selectFolderById(id)).pipe(
      switchMap((folder: FoldersEntity | undefined): Observable<FoldersEntity | null> => {
        if (folder) {
          return of(folder);
        } else {
          return of(null);
        }
      })
    );
  }

  loadFolder() {
    this.store.dispatch(FoldersActions.loadFolder());
  }
}
