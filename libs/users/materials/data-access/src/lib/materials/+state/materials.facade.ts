import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateMaterialDTO } from '../../models/materials.interface';
import * as MaterialsActions from './materials.actions';
import { MaterialsErrors } from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly materialStatus$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly materialError$: Observable<MaterialsErrors | null> = this.store.pipe(
    select(MaterialsSelectors.selectMaterialsError)
  );
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly filteredMaterials$ = this.store.pipe(select(MaterialsSelectors.selectFilteredMaterials));

  loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  addMaterial(materialData: CreateMaterialDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
