import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { Observable } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';
import { CreateMaterialDTO } from '../models/material-model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.select(MaterialsSelectors.selectMaterialsError);

  public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllМaterials);


  loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  addMaterial(material: CreateMaterialDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }))
  }  
}
