import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateMaterial } from '@users/ui-materials';

import { MaterialsActions } from './materials.actions';
import { selectFilteredMaterials, selectMaterialsLoadingStatus } from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  readonly isLoadingStatus$ = this.store.select(selectMaterialsLoadingStatus);
  readonly filteredMaterials$ = this.store.select(selectFilteredMaterials);

  loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  createMaterial(createMaterial: CreateMaterial) {
    this.store.dispatch(MaterialsActions.createMaterial({ createMaterial }));
  }
}
