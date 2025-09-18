import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AddFolder, Folder } from '../interface/folders.interface';

export const FoldersActions = createActionGroup({
  source: 'Folders Page',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailure: props<{ error: HttpErrorResponse }>(),

    addFolder: props<{ folder: AddFolder }>(),
    addFolderSuccess: props<{ folder: Folder }>(),
    addFolderFailure: props<{ error: HttpErrorResponse }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailure: props<{ error: HttpErrorResponse }>(),

    openFolder: props<{ id: number }>(),
    openFolderSuccess: props<{ folder: Folder }>(),
    openFolderFailure: props<{ error: HttpErrorResponse }>(),
  },
});
