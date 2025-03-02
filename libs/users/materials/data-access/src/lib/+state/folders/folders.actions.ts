import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FoldersEntity } from '@users/core/data-access';
import { FoldersErrors } from '../../models/folders-error';

export const foldersActions = createActionGroup({
  source: 'Folders',
  events: {
    loadFolders: emptyProps(),

    loadFoldersSuccess: props<{ folders: FoldersEntity[] }>(),
    loadFoldersFailure: props<{ error: FoldersErrors }>(),

    addFolder: props<{ folderData: FoldersEntity }>(),
    addFolderSuccess: props<{ folderData: FoldersEntity }>(),
    addFolderFailure: props<{ error: FoldersErrors }>(),

    editFolder: props<{ folderData: FoldersEntity }>(),
    editFolderSuccess: props<{ folderData: FoldersEntity }>(),
    editFolderFailure: props<{ error: FoldersErrors }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailure: props<{ error: FoldersErrors }>()
  }
});
