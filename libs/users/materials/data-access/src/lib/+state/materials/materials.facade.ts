import { inject, Injectable } from '@angular/core';
import { materialsActions } from './materials.actions';
import { Store } from '@ngrx/store';
import { selectMaterials, selectMaterialsStatus } from './materials.selectors';
import { MaterialsState } from '../../services/materials-state.service';
import { Material } from '../../interfaces/material.interface';


@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private store = inject(Store);
  private materialsState = inject(MaterialsState);

  readonly materials$ = this.store.select(selectMaterials);
  readonly status$ = this.store.select(selectMaterialsStatus);
  readonly deleteMaterial$ = this.materialsState.deleteMaterial$;
  readonly openMaterial$ = this.materialsState.openMaterial$;

  loadMaterials(id: number): void {
    this.store.dispatch(materialsActions.loadMaterials({ id }));
  }

  deleteMaterial(id: number): void {
    this.store.dispatch(materialsActions.deleteMaterial({ id }));
  }

  createMaterial(material: Partial<Material>): void {
    console.log(material);
    this.store.dispatch(materialsActions.createMaterial({ material }));
  }
}