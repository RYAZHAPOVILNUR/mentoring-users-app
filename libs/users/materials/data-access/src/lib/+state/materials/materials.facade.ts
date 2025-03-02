import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelector from './materials.selectors';
import * as MaterialsActions from './materials.actions';


@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelector.selectAllMaterials));
  public readonly status$ = this.store.pipe(select(MaterialsSelector.selectMaterialsStatus));
  public readonly error$ = this.store.pipe(select(MaterialsSelector.selectMaterialsError));

  init(){
    this.store.dispatch(MaterialsActions.initMaterials())
  }
}
