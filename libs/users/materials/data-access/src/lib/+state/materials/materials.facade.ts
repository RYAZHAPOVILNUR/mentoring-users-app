import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialsSelectors from '../materials/materials.selectors';
import { MaterialsActions } from './materials.actions';
import { MaterialCreate } from '../../models/folders.interface';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  constructor(private store: Store) {}

  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly error$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));

  public load(folderId: number) {
    this.store.dispatch(MaterialsActions.loadMaterials({ folderId }));
  }
  public createMaterial(material: MaterialCreate) {
    this.store.dispatch(MaterialsActions.createMaterial({ ...material }));
  }

  public deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
