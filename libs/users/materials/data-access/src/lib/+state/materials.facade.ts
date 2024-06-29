import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as FoldersSelectors from './folders/folders.selectors';
import * as MaterialsSelectors from './materials/materials.selectors';
import { FoldersActions } from "./folders/folders.actions";
import { MaterialsActions } from "./materials/materials.actions";
import { CreateFolder } from "../models/create-folder.model";
import { CreateMaterialsEntity } from "../models/create-material.entity";

@Injectable({
  providedIn: 'root'
})
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.select(FoldersSelectors.selectAllFolders);
  public readonly foldersStatus$ = this.store.select(FoldersSelectors.selectFoldersStatus);
  public readonly foldersError$ = this.store.select(FoldersSelectors.selectFoldersError);

  public readonly materials$ = this.store.select(MaterialsSelectors.selectMaterialsByFolder);
  public readonly materialsStatus$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly materialsError$ = this.store.select(MaterialsSelectors.selectMaterialsError);

  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  addFolder(folderData: CreateFolder) {
    this.store.dispatch(FoldersActions.addFolder({ folderData }))
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }))
  }

  loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  addMaterial(materialData: CreateMaterialsEntity) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }))
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
