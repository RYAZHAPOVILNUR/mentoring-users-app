import { inject, Injectable } from '@angular/core';
import { materialsActions } from './materials.actions';
import { Store } from '@ngrx/store';
import { selectMaterialsByFolderId, selectMaterialsStatus } from './materials.selectors';
import { MaterialsState } from '../../services/materials-state.service';
import { tap } from 'rxjs';
import { MaterialCreate } from '../../types/material-create.type';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private store = inject(Store);
  private materialsState = inject(MaterialsState);
  readonly status$ = this.store.select(selectMaterialsStatus);
  readonly materialsInFolder$ = this.store.select(selectMaterialsByFolderId);
  readonly deleteMaterial$ = this.materialsState.deleteMaterial$;
  readonly openMaterialHandler$ = this.materialsState.openMaterial$.pipe(
    tap((id) => this.openMaterial(id))
  );

  loadMaterials(): void {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  deleteMaterial(id: number): void {
    this.store.dispatch(materialsActions.deleteMaterial({ id }));
  }

  createMaterial(material: MaterialCreate): void {
    this.store.dispatch(materialsActions.createMaterial({ material }));
  }

  openMaterial(id: number): void {
    this.materialsState.openMaterial(id);
  }
}