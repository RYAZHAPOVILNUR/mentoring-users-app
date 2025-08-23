import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateFolder, Folder } from '../interfaces/create-folder.interface';

export const foldersActions = createActionGroup({
  source: 'Folders',
  events: {
    publishFolder: props<{ folder: CreateFolder }>(),
    publishFolderSuccess: props<{ folder: Folder }>(),
    publishFolderFailed: props<{ error: Error }>(),

    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailed: props<{ error: Error }>(),

    getFolderForMaterials: emptyProps(),
    getFolderForMaterialsSuccess: props<{ folder: Folder }>(),
    getFolderForMaterialsFailed: props<{ error: Error }>(),

    deleteFolder: props<{ folder_id: number }>(),
    deleteFolderSuccess: props<{ folder_id: number }>(),
    deleteFolderFailed: props<{ error: Error }>(),
  },
});
