import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';
import * as MaterialsActions from './materials.actions';
import { IAddMaterial } from '../../models/material.model';

@Injectable({
  providedIn: 'root',
})
export class materialsFacade {
  private readonly store = inject(Store);

  public readonly materialsStatus$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsEntities));
  public readonly openedMaterials$ = this.store.select(MaterialsSelectors.selectOpenedMaterials);
  public readonly materialsErrors$: Observable<MaterialsErrors | null> = this.store.pipe(
    select(MaterialsSelectors.selectMaterialsError)
  );

  public loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public deleteMaterials(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  public addMaterials(materialData: IAddMaterial) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }
}
