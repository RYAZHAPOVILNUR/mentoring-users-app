import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions, FoldersActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { selectAllFolders } from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(selectAllFolders)
  
  loadFolder(folder: Folder) {
    this.store.dispatch(FoldersActions.loadFolder({folder}))
  }
  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders())
  }
}
