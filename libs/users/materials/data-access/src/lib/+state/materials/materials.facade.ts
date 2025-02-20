import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import * as MaterialsFeature from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';
import { Observable } from 'rxjs';
import { MaterialsErrors } from './materials.models';
import { MaterialsEntity, selectQueryParam, selectRouteParam } from '@users/core/data-access';

@Injectable({
  providedIn: 'root',
})
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(
    select(MaterialsSelectors.selectMaterialsError)
  );
  public readonly folderId$: Observable<string | undefined> = this.store.pipe(select(selectRouteParam('id')));
  public readonly folderTitle$: Observable<string | undefined> = this.store.pipe(
    select(selectQueryParam('folderTitle'))
  );

  init() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }

  addMaterial(materialData: MaterialsEntity) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  editMaterial(material: MaterialsEntity) {
    this.store.dispatch(MaterialsActions.editMaterialSuccess({ materialData: material }));
  }

  openMaterial(materialId: number) {
    this.store.dispatch(MaterialsActions.getMaterialById({ materialId }));
  }
}
