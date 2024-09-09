import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './lib/+state/folders/folders.selectors';
import * as FoldersActions from './lib/+state/folders/folders.actions';
import { CreateFolderDTO } from '@users/core/data-access';
import * as MaterialsSelectors from './lib/+state/materials/materials.selectors';
import { MaterialsActions } from './lib/+state/materials/materials.actions';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
    private readonly store = inject(Store);

    public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
    public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
    public readonly currentFolder$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder));
    public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectCurrentMaterials));
    public readonly currentMaterials$ = this.store.pipe(select(MaterialsSelectors.selectCurrentMaterials));

    initFolders() {
        this.store.dispatch(FoldersActions.initFolders());
    }

    addFolder(folderData: CreateFolderDTO) {
        this.store.dispatch(FoldersActions.addFolder({ folderData }));
    }

    deleteFolder(folderId: number) {
        this.store.dispatch(FoldersActions.deleteFolder({ folderId }));
    }

    loadMaterials() {
        this.store.dispatch(MaterialsActions.loadMaterials());
    }
}
