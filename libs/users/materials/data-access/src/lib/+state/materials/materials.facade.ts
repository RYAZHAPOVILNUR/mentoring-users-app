import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import * as MaterialsFeature from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllMaterials);
  public readonly selectedMaterials$ = this.store.select(MaterialsSelectors.selectEntity);
  public readonly errors$ = this.store.select(MaterialsSelectors.selectMaterialsError);
  public readonly materialsForOpenedFolder$ = this.store.select(
    MaterialsSelectors.selectMaterialsForOpenedFolder);

  initMaterials() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }
}
