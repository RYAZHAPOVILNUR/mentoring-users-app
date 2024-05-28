import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder, FolderCreate, FolderErrors } from '../../models/folders.interface';

export const MaterialsFoldersAction = createActionGroup({
  source: '[Material Folder]',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailure: props<{ error: FolderErrors }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailure: props<{ error: FolderErrors }>(),

    createFolder: props<{ title: FolderCreate }>(),
    createFolderSuccess: props<{ folder: Folder }>(),
    createFolderFailure: props<{ error: FolderErrors }>(),
  },
});
