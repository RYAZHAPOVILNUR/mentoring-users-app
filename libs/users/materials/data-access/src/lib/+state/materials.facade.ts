import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AddNewFolder, Folder } from "../interfaces/folder.interface";
import { selectAllFolders, selectAllMaterials } from "./materials.selectors";
import { AddNewMaterial, Material } from "../interfaces/material.interface";
import { addFolder, addMaterial, deleteFolder, deleteMaterial, loadFolders, loadMaterials } from "./materials.actions";

@Injectable({providedIn: 'root'})
export class MaterialsFacade{
    private readonly store = inject(Store)

    public readonly folders$: Observable<Folder[]> = this.store.select(selectAllFolders);
    public readonly materials$: Observable<Material[]> = this.store.select(selectAllMaterials);

    loadFolders() {
        this.store.dispatch(loadFolders())
    }

    addFolder(NewFolderData: AddNewFolder) {
        this.store.dispatch(addFolder({ NewFolderData }))
    }

    deleteFolder(id: number) {
        this.store.dispatch(deleteFolder({ id }))
    }

    loadMaterials() {
        this.store.dispatch(loadMaterials())
    }

    addMaterial(NewMaterialData: AddNewMaterial) {
        this.store.dispatch(addMaterial({NewMaterialData}))
    }

    deleteMaterial(id: number) {
        this.store.dispatch(deleteMaterial({ id }))
    }
}