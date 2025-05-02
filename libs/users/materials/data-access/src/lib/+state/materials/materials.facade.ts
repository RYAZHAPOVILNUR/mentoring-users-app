import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as MaterialsActions from './materials.actions';
import { CreateMaterialDTO } from "../../models-material/material-dto.model";
import * as Selectors from './materials.selectors';
import { Observable } from "rxjs";
import { MaterialsErrors } from "./materials.reducer";
import { selectRouteParam } from "@users/core/data-access";

@Injectable({
  providedIn: 'root',
})
export class MaterialsFacade {
  
  private readonly store = inject(Store);

  public readonly materialsStatus$ = this.store.select(Selectors.selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(Selectors.selectAllMaterials);
  public readonly error$: Observable<MaterialsErrors | null> = this.store.select(Selectors.selectMaterialsError);
  public readonly folderId$: Observable<string | undefined> = this.store.select(selectRouteParam('id'));

  initMaterials() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }
  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
  addMaterial(materialData: CreateMaterialDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }

}