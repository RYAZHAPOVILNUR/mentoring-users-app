import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {MaterialsActions} from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectFolders)
  public readonly selectedMaterials$ = this.store.select(MaterialsSelectors.selectEntity)

  init() {
    this.store.dispatch(MaterialsActions.initFolders());
  }
}
