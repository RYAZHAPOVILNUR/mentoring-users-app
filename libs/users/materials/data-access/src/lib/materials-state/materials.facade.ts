import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import * as MaterialsFeature from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';

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
}
