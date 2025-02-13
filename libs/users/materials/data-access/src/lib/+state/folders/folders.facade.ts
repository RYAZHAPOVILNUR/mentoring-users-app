import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  initFolders() {
    this.store.dispatch(FoldersActions.initFolders());
  }
}
