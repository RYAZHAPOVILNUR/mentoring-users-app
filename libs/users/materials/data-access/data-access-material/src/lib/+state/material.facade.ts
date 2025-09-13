import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { materialActions } from './material.actions';
import * as materialSelectors from './material.selectors';
import { MaterialFormData } from '../types/material-form.type';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(materialSelectors.status);
  public readonly materials$ = this.store.select(materialSelectors.selectFolderMaterials);

  addMaterial(material: MaterialFormData) {
    this.store.dispatch(materialActions.addMaterial({ material }));
  }

  loadMaterials() {
    this.store.dispatch(materialActions.loadMaterials());
  }

  deleteMaterial(materialId: number) {
    this.store.dispatch(materialActions.deleteMaterial({ materialId }));
  }
}
