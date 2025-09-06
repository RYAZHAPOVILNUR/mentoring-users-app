import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateFolder } from '../interfaces/create-folder.interface';
import { Folder } from '../interfaces/folder.interface';

export const foldersActions = createActionGroup({
  source: 'Folders',
  events: {
    publishFolder: props<{ folder: CreateFolder }>(),
    publishFolderSuccess: props<{ folder: Folder }>(),
    publishFolderFailed: props<{ error: HttpErrorResponse }>(),

    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailed: props<{ error: HttpErrorResponse }>(),

    getFolderForMaterials: emptyProps(),
    getFolderForMaterialsSuccess: props<{ folder: Folder }>(),
    getFolderForMaterialsFailed: props<{ error: HttpErrorResponse }>(),

    deleteFolder: props<{ folderId: number }>(),
    deleteFolderSuccess: props<{ folderId: number }>(),
    deleteFolderFailed: props<{ error: HttpErrorResponse }>(),
  },
});
