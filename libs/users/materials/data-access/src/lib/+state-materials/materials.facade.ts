import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as materialSelector from './materials.selectors';
import * as materialActions from './materials.actions';
import { MaterialsErrors } from './materials.reducer';
import { Observable } from 'rxjs';
import { AddMaterialsType } from '../models/materials.type';

@Injectable({ providedIn: 'root' })
export class materialsFacade {
  private readonly store = inject(Store);

  public readonly materialsStatus$ = this.store.select(materialSelector.selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(materialSelector.selectAllMaterials);
  public readonly selectMaterial$ = this.store.select(materialSelector.selectMaterialsEntities);
  public readonly openMaterial$ = this.store.select(materialSelector.selectOpenedMaterials);
  public readonly MaterialsError$: Observable<MaterialsErrors | null> = this.store.select(materialSelector.selectMaterialsError);

  public init() {
    this.store.dispatch(materialActions.initMaterials());
  }

  public deleteMaterial(id: number) {
    this.store.dispatch(materialActions.deleteMaterials({ id }));
  }

  public addMaterial(materialData: AddMaterialsType) {
    this.store.dispatch(materialActions.addMaterials({ materialData }));
  }
}
