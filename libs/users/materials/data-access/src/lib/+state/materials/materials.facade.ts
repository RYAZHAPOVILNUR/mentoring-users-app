import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selectors';
import { materialActions } from './materials.actions';
import { Observable, of, switchMap } from 'rxjs';
import { MaterialsEntity } from '../../models/materials.models';
import { createMaterial } from '../../models/create-material.model';
import { materialFilter } from '../../models/material-filter.models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialStatus));
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectMaterialEntity));
  public readonly openedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectOpenedMaterials));
  public readonly filteredMaterials$ = this.store.pipe(select(MaterialsSelectors.selectFilteredMaterials));

    loadMaterials() {
      this.store.dispatch(materialActions.loadMaterials());
    }
  
    loadMaterial() {
      this.store.dispatch(materialActions.loadMaterial());
    }
  
    addMaterial(materialData: createMaterial) {
      this.store.dispatch(materialActions.addMaterial({ materialData }));
    }
  
    deleteMaterial(id: number) {
      this.store.dispatch(materialActions.deleteMaterial({ id }));
    }
  
    getMaterialFromStore(id: number) {
      return this.store.select(MaterialsSelectors.selectMaterialById(id)).pipe(
        switchMap((material: MaterialsEntity | undefined): Observable<MaterialsEntity | null> => {
          if (material) {
            return of(material);
          } else {
            return of(null);
          }
        })
      );
    }

    filterMaterials(filter: materialFilter) {
      this.store.dispatch(materialActions.setMaterialFilter({ filter }));
    }

}
