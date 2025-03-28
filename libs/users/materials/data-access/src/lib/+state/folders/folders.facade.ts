import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoldersErrors } from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';
import * as FoldersActions from './folders.actions';

@Injectable({
  providedIn: 'root',
})
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly foldersStatus$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectFoldersEntities));
  public readonly openedFolder$ = this.store.select(FoldersSelectors.selectOpenedFolder);
  public readonly foldersErrors$: Observable<FoldersErrors | null> = this.store.pipe(
    select(FoldersSelectors.selectFoldersError)
  );

  public loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  public deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  public addFolder(title: string) {
    this.store.dispatch(FoldersActions.addFolder({ title }));
  }
}
