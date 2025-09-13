import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateFolderDTO } from '../types/create-folder-dto.type';
import { FolderVM } from '../types/folder-vm.type';

export const folderActions = createActionGroup({
  source: 'Folders',
  events: {
    addFolder: props<{ folder: CreateFolderDTO }>(),
    addFolderSuccess: props<{ folder: FolderVM }>(),
    addFolderFailed: props<{ error: HttpErrorResponse }>(),

    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: FolderVM[] }>(),
    loadFoldersFailed: props<{ error: HttpErrorResponse }>(),

    loadFolderById: emptyProps(),
    loadFolderByIdSuccess: props<{ folder: FolderVM }>(),
    loadFolderByIdFailed: props<{ error: HttpErrorResponse }>(),

    deleteFolder: props<{ folderId: number }>(),
    deleteFolderSuccess: props<{ folderId: number }>(),
    deleteFolderFailed: props<{ error: HttpErrorResponse }>(),
  },
});
