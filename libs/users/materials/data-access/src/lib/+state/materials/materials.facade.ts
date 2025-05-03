import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelectors from '../materials/materials.selectors';
import * as MaterialActions from '../materials/materials.actions';
import { Observable } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly errors$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));
  public readonly openedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectOpenedMaterials));
  public readonly materialStatus$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly materialsErrors$: Observable<MaterialsErrors | null> = this.store.pipe(select(MaterialsSelectors.selectMaterialsError))

  loadMaterials() {
    this.store.dispatch(MaterialActions.loadMaterials());
  }
}
