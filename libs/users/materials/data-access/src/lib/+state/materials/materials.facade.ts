import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { materialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { TMaterialCreate, TMaterialDTO } from '../../models/materials/material-data.models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly materialsAll$ = this.store.select(MaterialsSelectors.selectMaterialsAll);
  public readonly status$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly error$ = this.store.select(MaterialsSelectors.selectMaterialsError);

  loadMaterials(): void {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  createMaterial(material: TMaterialCreate): void {
    this.store.dispatch(materialsActions.createMaterial({ material }));
  }

  deleteMaterial(material: TMaterialDTO): void {
    this.store.dispatch(materialsActions.deleteMaterial({ material }))
  }
}
