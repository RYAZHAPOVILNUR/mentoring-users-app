import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { CreateMaterialDTO } from '../../models/materials.models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private store = inject(Store);

  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectFilteredMaterial));
  public readonly selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectMaterialEntity));
  // public readonly openedMaterial$ = this.store.select(MaterialsSelectors.selectFilteredMaterial);
  // public readonly loggedUser$ = this.store.select(selectLoggedUser);
  public readonly errors$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));

    init() {
      this.store.dispatch(MaterialsActions.initMaterials());
    }

    deleteMaterial(id: number) {
      this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
    }

    addMaterial(material: CreateMaterialDTO) {
      this.store.dispatch(MaterialsActions.addMaterial({ material }));
    }
    
    loadMaterial() {
      this.store.dispatch(MaterialsActions.loadMaterial());
    }
    
    // openMaterial(){
    //   this.store.dispatch(MaterialsActions.openMaterial({ materialData }));
    // }

    // editMaterial(materialData: CreateMaterialDTO, id: number, onSuccessCb: onSuccessEditionCbType) {
    //   this.store.dispatch(MaterialsActions.editMaterial({ materialData, id, onSuccessCb }));
    // }

    // getMaterialFromStore(id: number) {
    //   return this.store.select(MaterialsSelectors.selectMaterialById(id)).pipe(
    //     switchMap((material: MaterialsEntity | undefined): Observable<MaterialsEntity | null> => {
    //       if (material) {
    //         return of(material);
    //       } else {
    //         return of(null);
    //       }
    //     })
    //   );
    // }

}
