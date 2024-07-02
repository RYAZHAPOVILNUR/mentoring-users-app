import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectAllFolders, selectStatus } from './materials.selectors';
import { FolderAdd } from '../models/folder-add.model';

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly foldersStatus$ = this.store.select(selectStatus);

  public initFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({id}));
  }

  public addFolder(title: FolderAdd) {
    this.store.dispatch(MaterialsActions.addFolder({title}));
  }
}
