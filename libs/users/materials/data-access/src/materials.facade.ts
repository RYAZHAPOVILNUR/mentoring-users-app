import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './lib/+state/folders/folders.selectors';
import { foldersActions } from './lib/+state/folders/folders.actions';
import { CreateFolderDTO, CreateMaterialDTO } from '@users/core/data-access';
import * as MaterialsSelectors from './lib/+state/materials/materials.selectors';
import { MaterialsActions } from './lib/+state/materials/materials.actions';

@Injectable({ providedIn: 'root' })
export class materialsFacade {
    private readonly store = inject(Store);

    public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
    public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
    public readonly currentFolder$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder));
    public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectCurrentMaterials));
    public readonly currentMaterials$ = this.store.pipe(select(MaterialsSelectors.selectCurrentMaterials));

    initFolders() {
        this.store.dispatch(foldersActions.initFolders());
    }

    addFolder(folderData: CreateFolderDTO) {
        this.store.dispatch(foldersActions.addFolder({ folderData }));
    }

    deleteFolder(folderId: number) {
        this.store.dispatch(foldersActions.deleteFolder({ folderId }));
    }

    loadMaterials() {
        this.store.dispatch(MaterialsActions.loadMaterials());
    }

    addMaterial(materialData: CreateMaterialDTO) {
        this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
    }

    deleteMaterial(materialId: number) {
        this.store.dispatch(MaterialsActions.deleteMaterial({ materialId }));
    }
}