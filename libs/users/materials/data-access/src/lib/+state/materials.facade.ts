import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import * as MaterialsFeature from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';
import { foldersActions } from './materials.actions';

@Injectable()
export class MaterialsFacade {
  private readonly store = inject(Store);
  public loadFolders(): void {
    this.store.dispatch(foldersActions.loadFolders());
  }





  // loaded$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsLoaded));
  // allMaterials$ = this.store.pipe(
  //   select(MaterialsSelectors.selectAllMaterials)
  // );
  // selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectEntity));
  // init() {
  //   this.store.dispatch(MaterialsActions.initMaterials());
  // }
}
