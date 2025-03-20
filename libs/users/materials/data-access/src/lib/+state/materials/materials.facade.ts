import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICreateMaterial } from '../../models/materials-models';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly errors$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectFilteredMaterials));
  

  addMaterial(material: ICreateMaterial) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }
  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
  loadMaterials(folderId: number): void {
    this.store.dispatch(MaterialsActions.loadMaterials({folderId}));
  }
}
