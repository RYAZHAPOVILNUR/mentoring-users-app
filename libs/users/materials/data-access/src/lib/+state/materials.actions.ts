import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolder, Folder } from '../models/materials.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),

    addFolder: props<{ folder: CreateFolder }>(),
    addFolderSuccess: props<{ newFolder: Folder }>(),

    getFolderForRead: emptyProps(),
    getFolderForReadSucces: props<{ folder: Folder }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),

    loadFoldersFailure: props<{ error: string}>()
  },
});
