import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selector';
import { MaterialsActions } from './materials.actions';
import { CreateMaterial } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterial));
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly error$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));

  public load(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public delete(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  public create(material: CreateMaterial) {
    console.log('material', material);

    this.store.dispatch(MaterialsActions.createMaterial({ ...material }));
  }
}
