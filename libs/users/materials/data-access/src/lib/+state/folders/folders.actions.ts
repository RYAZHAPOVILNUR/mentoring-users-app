import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FoldersEntity } from '@users/core/data-access';
import { FoldersErrors } from './folders.models';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    initFolders: emptyProps(),

    loadFoldersSuccess: props<{ folders: FoldersEntity[] }>(),
    loadFoldersFailure: props<{ error: FoldersErrors }>(),

    addFolder: props<{ folderData: FoldersEntity }>(),
    addFolderSuccess: props<{ folderData: FoldersEntity }>(),
    addFolderFailed: props<{ error: FoldersErrors }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailed: props<{ error: FoldersErrors }>(),

    editFolder: props<{ folderData: FoldersEntity }>(),
    editFolderSuccess: props<{ folderData: FoldersEntity }>(),
    editFolderFailed: props<{ error: FoldersErrors | null }>(),
  },
});
