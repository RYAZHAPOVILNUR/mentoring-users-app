import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadingStatus } from '@shared/util-store';

import { MaterialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { CreateMaterial, Material } from '../interface/materials.interface';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allMaterials$: Observable<Material[]> = this.store.select(MaterialsSelectors.selectAllMaterials);
  public readonly materialsStatus$: Observable<LoadingStatus> = this.store.select(
    MaterialsSelectors.selectMaterialsStatus,
  );
  public readonly materialsError$: Observable<HttpErrorResponse | null> = this.store.select(
    MaterialsSelectors.selectMaterialsError,
  );
  loadMaterials(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  deleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  addMaterial(material: CreateMaterial): void {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }
}
