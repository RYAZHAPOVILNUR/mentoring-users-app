import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './lib/+state/folders/folders.selectors';
import * as FoldersActions from './lib/+state/folders/folders.actions';
import { CreateFolderDTO } from '@users/core/data-access';
import { MaterialsActions } from './lib/+state/materials/materials.actions';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
    private readonly store = inject(Store);

    public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
    public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));

    initFolders() {
        this.store.dispatch(FoldersActions.initFolders());
        this.allFolders$.subscribe(res => console.log(res));
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
