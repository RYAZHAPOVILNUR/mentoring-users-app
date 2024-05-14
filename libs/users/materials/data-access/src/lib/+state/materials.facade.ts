import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectFolderMaterials, selectFolders, selectMaterialsFeatureStatus, selectOpenedFolder } from "./materials.selectors";
import { MaterialsActions } from "./materials.actions";
import { map, take, tap } from "rxjs";
import { CreateFolder, CreateMaterial } from "../models/types";

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
    private readonly store = inject(Store);
    public readonly folders$ = this.store.select(selectFolders);
    public readonly openedFolders$ = this.store.select(selectOpenedFolder)
    public readonly filteredMaterials$ = this.store.select(selectFolderMaterials);
    public readonly status$ = this.store.select(selectMaterialsFeatureStatus);


    constructor() {
        this.store.dispatch(MaterialsActions.loadFolders());
    }

    addFolder(newFolder: CreateFolder): void {
        this.store.dispatch(MaterialsActions.addFolder({ newFolder }))
    }

    deleteFolder(id: number): void {
        this.store.dispatch(MaterialsActions.deleteFolder({ id }));
    }

    openFolder(id: number): void {
        this.store.dispatch(MaterialsActions.loadMaterials());
        this.folders$.pipe(
            take(1),
            map(folders => folders.find(folder => folder.id === id)),
            tap(folder => {
                console.log(folder);
                this.store.dispatch(MaterialsActions.openFolderSuccess({ id }))
            })
        ).subscribe();
    }

    deleteMaterial(id: number): void {
        this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
    }

    addMaterial(newMaterial: CreateMaterial): void {
        this.openedFolders$.pipe(
            take(1),
            tap(folder => {
                const materialData: CreateMaterial = {
                    ...newMaterial,
                    folder_id: folder!.id
                }
                this.store.dispatch(MaterialsActions.addMaterial({ newMaterial: materialData }))
            })
        ).subscribe()
    }


}