import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),
    initMaterialsSuccess: props<{folders: Folder[]}>(),
    initMaterialsFailure: emptyProps(),
    loadAllFolders: emptyProps(),
    loadFoldersFailure: props<{ error: any }>(),
    addNewFolder: props<{newFolderData: AddFolder}>(),
    addFolderSuccess: props<{newFolder: Folder}>(),
    deleteFolder: props<{id: number}>(),
    deleteFolderSuccess: props<{id: number}>(),
    deleteFolderFailed: props<{ error: any }>(),
  },
});
