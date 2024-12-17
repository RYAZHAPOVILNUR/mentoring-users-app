import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { IAddMaterial } from '../models/material-add.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));

  public readonly materialsStatus$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));

  public loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public addMaterial(material: IAddMaterial) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }

  public deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
