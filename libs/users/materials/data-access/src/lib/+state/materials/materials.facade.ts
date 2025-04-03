import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import * as MaterialSelectors from './materials.selectors';
import { Observable, of } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly filtredMaterials$ = this.store.select(MaterialSelectors.selectFilteredMaterials);
  public readonly status$ = this.store.pipe(select(MaterialSelectors.selectMaterialsStatus || of(null)));
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(
    select(MaterialSelectors.selectMaterialsError)
  );

  loadMaterials(): void {
    this.store.dispatch(MaterialActions.loadMaterials());
  }
}
