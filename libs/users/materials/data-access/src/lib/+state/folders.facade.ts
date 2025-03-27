import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);
  public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));


  addFolder(title: string) {
    this.store.dispatch(FoldersActions.addFolder({ title }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  init() {
    this.store.dispatch(FoldersActions.initFolder());
  }
}
