import { CreateMaterialDTO, MaterialEntity } from "@users/core/data-access";
import { UserMaterialActions } from "./user-material.actions";
import { MaterialError } from "./user-material.reducers";
import * as UserMaterialSelectors from "./user-material.selectors";
import { Injectable, inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
type onSuccessEditionCbType = () => void;

@Injectable({providedIn: 'root'})
export class UserMaterialsFacade {
  private readonly store = inject(Store);
  public readonly status$ = this.store.pipe(select(UserMaterialSelectors.selectMaterialsStatus));
  public readonly allMaterials$ = this.store.pipe(select(UserMaterialSelectors.selectAllMaterials));
  public readonly selectedMaterials$ = this.store.pipe(select(UserMaterialSelectors.selectEntity));
  public readonly openedMaterial$ = this.store.select(UserMaterialSelectors.selectOpenedFolder);
  public readonly errors$: Observable<MaterialError | null> = this.store.pipe(select(UserMaterialSelectors.selectMaterialsError));
  init() {
    this.store.dispatch(UserMaterialActions.initMaterials());
  }

  addMaterial(materialData: CreateMaterialDTO) {
    this.store.dispatch(UserMaterialActions.addMaterial({materialData}));
  }

  editMaterial(materialData: MaterialEntity, id: number, onSuccess: onSuccessEditionCbType) {
    this.store.dispatch(UserMaterialActions.editMaterial({materialData, id, onSuccess}))
  }

  deleteMaterial(id: number) {
    this.store.dispatch(UserMaterialActions.deleteMaterial({id}));
  }

  loadMaterial() {
    this.store.dispatch(UserMaterialActions.loadMaterial())
  }
}