import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { materialsActions } from './materials.actions';
import * as materialsSelectors from './materials.selectors';
import { AddFolder } from '../models/add-folder.model';
import { showSnackbarType } from '../models/show-snackbar-type.model';
import { AddNewMaterial } from '../models/add-new-material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly allFolders$ = this.store.select(materialsSelectors.selectAllFolders);
  public readonly loadingStatus$ = this.store.select(materialsSelectors.selecLoadingStatus);
  public readonly foldersMaterials$ = this.store.select(materialsSelectors.selectFoldersMaterials);
  public readonly openedFolder$ = this.store.select(materialsSelectors.selectOpenedFolder);
  public readonly error$ = this.store.select(materialsSelectors.selectError)

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  loadFolders() {
    this.store.dispatch(materialsActions.loadFolders());
  }

  loadFolder() {
    this.store.dispatch(materialsActions.loadFolder());
  }

  addFolder(folderData: AddFolder, showSnackbarAddFolderSuccess: showSnackbarType) {
    this.store.dispatch(materialsActions.addFolder({ folderData, showSnackbarAddFolderSuccess }));
  }

  deleteFolder(id: number, showSnackbarDeleteFolderSuccess: showSnackbarType) {
    this.store.dispatch(materialsActions.deleteFolder({ id, showSnackbarDeleteFolderSuccess }));
  }

  loadMaterials() {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  addMaterial(material: AddNewMaterial) {
    this.store.dispatch(materialsActions.addMaterial({ material }));
  }

  deleteMaterial(id: number) {
    this.store.dispatch(materialsActions.deleteMaterial({ id }));
  }
}
