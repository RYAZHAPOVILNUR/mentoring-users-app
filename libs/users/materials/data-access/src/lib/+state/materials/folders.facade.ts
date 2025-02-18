import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import * as MaterialSelectors from './materials.selectors';
import { Observable, of, switchMap } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';
import { FoldersEntity } from '../../folders-dto/folders.entity';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly filtredFolders$ = this.store.select(MaterialSelectors.selectFiltredFolders);
  public readonly status$ = this.store.pipe(select(MaterialSelectors.selectFoldersStatus || of(null)));
  public readonly allFolders = this.store.pipe(select(MaterialSelectors.selectAllFolders));
  public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(
    select(MaterialSelectors.selectFoldersError)
  );

  init() {
    this.store.dispatch(MaterialActions.initFolders());
  }

  getFolderFromStore(id: number) {
    return this.store.select(MaterialSelectors.selectFolderById(id)).pipe(
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
    this.store.dispatch(MaterialActions.loadFolder());
  }
}
