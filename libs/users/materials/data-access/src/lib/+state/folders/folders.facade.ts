import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FoldersSelectors from './folders.selectors';
import * as FoldersActions from './folders.actions';
import { CreateFolderDTO } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class FoldersFacade {
    private readonly store = inject(Store);

    public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
    public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));

    init() {
        this.store.dispatch(FoldersActions.initFolders());
        this.allFolders$.subscribe(res => console.log(res));
    }

    addFolder(folderData: CreateFolderDTO) {
        this.store.dispatch(FoldersActions.addFolder({ folderData }));
    }

    deleteFolder(folderId: number) {
        this.store.dispatch(FoldersActions.deleteFolder({ folderId }));
    }
}
