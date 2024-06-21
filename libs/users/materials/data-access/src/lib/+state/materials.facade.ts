import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as MaterialsSelectors from './materials.selectors';
import { MaterialsActions } from "./materials.actions";
import { IAddFolder } from "../models/folder.model";
import { IAddMaterial } from "../models/material.model";

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
    store = inject(Store)
    public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders);
    public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllMaterials);
    public readonly openedFolderName$ = this.store.select(MaterialsSelectors.selectOpenedFolder);
    
    initFolders() {
        this.store.dispatch(MaterialsActions.loadFolders())
    }
    deleteFolder(id: number) {
        this.store.dispatch(MaterialsActions.deleteFolder({id}))
    }
    addFolder(title: IAddFolder) {
        this.store.dispatch(MaterialsActions.addFolder({title}))
    }

    initMaterials() {
        this.store.dispatch(MaterialsActions.loadMaterials())
    }
    addMaterial(newMaterial: IAddMaterial) {
        this.store.dispatch(MaterialsActions.addMaterial({newMaterial}))
    }
    deleteMaterial(id: number) {
        this.store.dispatch(MaterialsActions.deleteMaterial({id}))
    }
    
}