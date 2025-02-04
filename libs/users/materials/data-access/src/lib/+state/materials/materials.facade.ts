import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selectors';
import * as MaterialsActions from './materials.actions';
import { Observable } from 'rxjs';
import { TMaterialError } from '../../models/materials/material-error.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly materials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly errors$: Observable<TMaterialError | null> = this.store.pipe(
    select(MaterialsSelectors.selectMaterialsError)
  );

  public init(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public deleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterials({ id }));
  }
}
