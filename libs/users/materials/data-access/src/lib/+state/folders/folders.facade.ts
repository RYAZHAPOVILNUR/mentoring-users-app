import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as FoldersSelectors from './folders.selector';
import { FoldersActions } from './folders.actions';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
  public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
  public readonly error$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));

  public load() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  public delete(id: number): void {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  public create(title: string): void {
    this.store.dispatch(FoldersActions.createFolder({ title }));
  }
}
