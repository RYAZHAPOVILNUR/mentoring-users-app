import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MaterialsState } from './materials.reducer';
import { MaterialsErrors } from './models/material';
import { materialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { AddMaterialsEntity, LoadingStatus, MaterialsEntity } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })


export class MaterialsFacade {
  private readonly store = inject(Store<MaterialsState>);

  // SELECTORS
  private readonly allMaterials$: Observable<MaterialsEntity[]> = this.store.select(MaterialsSelectors.selectAllMaterials);
  private readonly status$: Observable<LoadingStatus> = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  private readonly error$: Observable<MaterialsErrors | null> = this.store.select(MaterialsSelectors.selectMaterialsError);
  private readonly selectedMaterial = this.store.select(MaterialsSelectors.selectMaterialsEntities);

  // ACTIONS
  loadMaterials() {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  addMaterial(materialData: AddMaterialsEntity) {
    this.store.dispatch(materialsActions.addMaterial({ materialData }));
  }

  deleteMaterial(materialId: number) {
    this.store.dispatch(materialsActions.deleteMaterial({ materialId }));
  }
}
