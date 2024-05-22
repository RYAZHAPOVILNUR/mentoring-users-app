import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { MaterialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { CreateMaterialsDTO } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allMaterials$ = this.store.select(
    MaterialsSelectors.selectMaterials
  );
  public readonly selectStatus$ = this.store.select(
    MaterialsSelectors.selectMaterialsStatus
  );
  public readonly selectErrors$ = this.store.select(
    MaterialsSelectors.selectMaterialsErrors
  );
  public readonly selectMaterialsInFolder$ = this.store.select(
    MaterialsSelectors.selectMaterialsInFolder
  );

  public init() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }
  public addMaterial(material: CreateMaterialsDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }
  public removeMaterial(id: number) {
    this.store.dispatch(MaterialsActions.removeMaterial({ id }));
  }
  public setOpenedFolderId(id: number) {
    this.store.dispatch(MaterialsActions.setOpenedFolderId({ id }));
  }
}
