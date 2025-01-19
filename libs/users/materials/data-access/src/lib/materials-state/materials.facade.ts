import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import * as MaterialsFeature from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';
import { MaterialsEntity } from './materials.models';
import { Observable } from 'rxjs';
import { CreateMaterialDTO } from '../models/materials-dto.models';

@Injectable()
export class MaterialsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsLoaded));
  allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }

  getMaterialsByFolder(folderID: number): Observable<MaterialsEntity[]> {
    return this.store.pipe(select(MaterialsSelectors.selectMaterialsByFolderId, { folderID }));
  }

  addMaterial(material: MaterialsEntity) {
    this.store.dispatch(MaterialsActions.addMaterial({ material: material }));
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
