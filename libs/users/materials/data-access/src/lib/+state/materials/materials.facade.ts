import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import * as MaterialSelectors from './materials.selectors';
import { Observable, of, switchMap } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';
import { MaterialsEntity } from '../../materials-dto/materials.entity';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  // public readonly allMaterials = this.store.pipe(select(MaterialSelectors.selectAllMaterials));
  public readonly filtredMaterials$ = this.store.select(MaterialSelectors.selectFiltredMaterials);
  // public readonly openedMaterial$ = this.store.select(MaterialSelectors.selectOpenedMaterial);
  public readonly status$ = this.store.pipe(select(MaterialSelectors.selectMaterialsStatus || of(null)));
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(
    select(MaterialSelectors.selectmaterialsError)
  );

  init() {
    this.store.dispatch(MaterialActions.initMaterials());
  }

  loadMaterials(): void {
    this.store.dispatch(MaterialActions.loadMaterials());
  }

  // getMaterialFromStore(id: number) {
  //   return this.store.select(MaterialSelectors.selectMaterialById(id)).pipe(
  //     switchMap((material: MaterialsEntity | undefined): Observable<MaterialsEntity | null> => {
  //       if (material) {
  //         return of(material);
  //       } else {
  //         return of(null);
  //       }
  //     })
  //   );
  // }

  // loadMaterial() {
  //   this.store.dispatch(MaterialActions.loadMaterials());
  //   console.log('Materials Facede loadmaterials...');
  // }
}
