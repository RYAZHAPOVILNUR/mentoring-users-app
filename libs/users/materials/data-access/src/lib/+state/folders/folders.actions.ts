import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder, FoldersErrors } from './folders.reducer';

export const FoldersActions = createActionGroup({
  source: '[Materials Folder]',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailed: props<{ error: FoldersErrors }>(),

    createFolder: props<{ title: string }>(),
    createFolderSuccess: props<{ folder: Folder }>(),
    createFolderFailed: props<{ error: FoldersErrors }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailed: props<{ error: FoldersErrors }>(),
  },
});
