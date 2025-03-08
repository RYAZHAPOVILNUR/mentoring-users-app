import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as MaterialsSelectors from './materials.selectors';
import * as MaterialsActions from './materials.actions';
import { IAddFolder } from "../models/folder-add.model";
import { IAddMaterial } from "../models/material-add.model";

@Injectable({
  providedIn: 'root'})
export class MaterialsFacade {
    private readonly store = inject(Store)

    //selectors
    public readonly foldersStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus)
    public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders)
    public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder)
  
    public readonly materialsStatus$ = this.store.select(MaterialsSelectors.selectMaterialsStatus)
    public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllMaterials)

    //actions
    loadFolders() {
      this.store.dispatch(MaterialsActions.loadFolders())
    }
    deleteFolder(id: number) {
      this.store.dispatch(MaterialsActions.deleteFolder({ id }))
    }
    addFolder(folder: IAddFolder) {
      this.store.dispatch(MaterialsActions.addFolder({ folder }))
    }
  
    loadMaterials() {
      this.store.dispatch(MaterialsActions.loadMaterials())
    }
    deleteMaterial(id: number) {
      this.store.dispatch(MaterialsActions.deleteMaterial({ id }))
    }
    addMaterial(material: IAddMaterial) {
      this.store.dispatch(MaterialsActions.addMaterial({ material }))
    }
}