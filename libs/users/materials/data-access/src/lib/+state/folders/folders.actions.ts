import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder, FoldersErrors } from './folders.reducer';

export const FoldersActions = createActionGroup({
  source: '[Materials Folder]',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailed: props<{ error: FoldersErrors }>(),

    createFolder: props<any>(),
    createFolderSuccess: props<any>(),
    createFolderFailed: props<{ error: FoldersErrors }>(),

    deleteFolder: props<any>(),
    deleteFolderSuccess: props<any>(),
    deleteFolderFailed: props<{ error: FoldersErrors }>(),
  },
});
