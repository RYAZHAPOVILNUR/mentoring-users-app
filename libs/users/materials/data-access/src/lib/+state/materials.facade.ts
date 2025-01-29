import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { IAddFolder } from '../models/folder-add.model';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly foldersStatus$ = this.store.pipe(select(MaterialsSelectors.selectFoldersStatus));
  public readonly foldersErrors$ = this.store.pipe(select(MaterialsSelectors.selectFoldersErrors));

  init() {
    this.store.dispatch(MaterialsActions.initFolders());
  }

  addFolder(folder: IAddFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }
}
