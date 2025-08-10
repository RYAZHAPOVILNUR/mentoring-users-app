import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { materialsActions } from './materials.actions';
import * as materialsSelectors from './materials.selectors';
import { CreateMaterial } from '../../interfaces/create-material.interface';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly materials$ = this.store.select(materialsSelectors.selectAllMaterials);
  public readonly status$ = this.store.select(materialsSelectors.selectStatus);

  publishMaterial(material: CreateMaterial) {
    this.store.dispatch(materialsActions.publishMaterial({ material }));
  }

  loadMaterials() {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  deleteMaterial(material_id: number) {
    this.store.dispatch(materialsActions.deleteMaterial({ material_id }));
  }
}
