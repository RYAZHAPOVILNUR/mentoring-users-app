import { inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as MaterialsSelectors from './materials.selectors'
import { Observable } from "rxjs";
import { MaterialsErrors } from "./materials.reducer";
import { MaterialsActions } from "./materials.actions";
import { CreateFolder } from "../models/create-folder.model";
import { CreateMaterial } from "../models/create-materials.model";

@Injectable({providedIn: "root"})
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allFolders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly foldersStatus$ = this.store.pipe(select(MaterialsSelectors.selectFoldersStatus));
  public readonly foldersErrors$: Observable<MaterialsErrors | null> = this.store.pipe(select(MaterialsSelectors.selectFoldersError));

  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly materialsStatus$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly materialsErrors$: Observable<MaterialsErrors | null> = this.store.pipe(select(MaterialsSelectors.selectMaterialsErrors))
  public readonly filteredMaterials$ = this.store.pipe(select(MaterialsSelectors.filteredMaterials))

  public loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public addFolder(folderData: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folderData }));
  }

  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  public loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  public addMaterial(materialData: CreateMaterial) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }
}