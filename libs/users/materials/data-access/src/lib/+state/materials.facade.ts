import { Injectable, inject } from '@angular/core';
import {
  selectAllFolders,
  selectOpenedFolder,
  selectStatus,
} from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { Store } from '@ngrx/store';
import { CreateFolder } from '../models/materials.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly getStatus$ = this.store.select(selectStatus);

  addFolder(folder: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  getFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }
}