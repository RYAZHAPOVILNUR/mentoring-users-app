import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { MaterialsActions } from "./materials.actions";
import * as Selectors from "./materials.selectors";
import { Observable } from "rxjs";
import { MaterialsErrors } from "./materials.reducer";
import { AddMaterialsType } from "../../models/material.type";

@Injectable({
  providedIn: 'root',
})
export class MaterialsFacade {

  private readonly store = inject(Store);

  public readonly materialsStatus$ = this.store.select(Selectors.selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(Selectors.selectAllMaterials);
  public readonly error$: Observable<MaterialsErrors | null> = this.store.select(Selectors.selectMaterialsError);

  initMaterials() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }

  addMaterial(material: AddMaterialsType ) {
    this.store.dispatch(MaterialsActions.addMaterial({ material })); 
  }
  
  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}