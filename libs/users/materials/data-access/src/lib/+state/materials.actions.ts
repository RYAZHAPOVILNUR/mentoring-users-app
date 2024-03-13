import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailure: props<{ error: Error }>(),

    addFolder: props<{ title: string }>(),
    addFolderSuccess: props<{ folder: Folder }>(),
    addFolderFailure: props<{ error: Error }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailure: props<{ error: Error }>(),
  },
});
