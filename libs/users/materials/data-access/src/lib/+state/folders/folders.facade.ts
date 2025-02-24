import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FoldersActions from './folders.actions'


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  init(){
    this.store.dispatch(FoldersActions.initFolders())
  }
}
