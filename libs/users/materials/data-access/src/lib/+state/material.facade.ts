import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { selectQueryParam } from '@users/core/data-access';
import {
    createdFolder,
    createdMaterial,
    FoldersActions,
    MaterialsActions,
    selectAllFolder,
    selectAllMaterial,
    selectFolderStatus,
    selectMaterialStatus
} from '@users/materials/data-access'
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class MaterialsFacade {
    private readonly store = inject(Store);
    public readonly folders$ = this.store.select(selectAllFolder);
    public readonly folderStatus$ = this.store.select(selectFolderStatus);
    public readonly materials$ = this.store.select(selectAllMaterial);
    public readonly materialStatus = this.store.select(selectMaterialStatus)
    public readonly folderName$ = this.store.select(selectQueryParam('folderName'))

    public loadFolders() {
        this.store.dispatch(FoldersActions.loadFolders())
    }

    public createFolder(createdFolder: createdFolder) {
        this.store.dispatch(FoldersActions.createNewFolder({ createdFolder }))
    }

    public deleteFolder(id: number) {
        this.store.dispatch(FoldersActions.deleteFolder({ id }))
    }

    public loadMaterials() {
        this.store.dispatch(MaterialsActions.loadMaterials())
    }
    public createMaterial(createdMaterial: createdMaterial) {
        this.store.dispatch(MaterialsActions.createMaterial({ createdMaterial }))
    }
    public deleteMaterial(id: number) {
        this.store.dispatch(MaterialsActions.deleteMaterial({ id }))
    }
}