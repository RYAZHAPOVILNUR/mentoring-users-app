import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { materialsActions } from './materials.actions';
import * as materialsSelectors from './materials.selectors'
import { AddFolder } from '../models/add-folder.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store)

    /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  public readonly allFolders$ = this.store.select(materialsSelectors.selectAllFolders)
  public readonly loadingStatus$ = this.store.select(materialsSelectors.selecLoadingStatus)

      /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(materialsActions.initMaterials())
  };

  addNewFolder(newFolderData: AddFolder) {
    this.store.dispatch(materialsActions.addNewFolder({newFolderData}))
  }
}

