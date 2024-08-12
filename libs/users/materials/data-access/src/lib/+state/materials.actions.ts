import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';
import { showSnackbarType } from '../models/showSnackbarType.model';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),
    initMaterialsSuccess: props<{folders: Folder[]}>(),
    initMaterialsFailure: emptyProps(),
    loadAllFolders: emptyProps(),
    loadFoldersFailure: props<{ error: any }>(),
    addFolder: props<{newFolderData: AddFolder; showSuccessSnackbar: showSnackbarType}>(),
    addFolderSuccess: props<{newFolder: Folder}>(),
    deleteFolder: props<{id: number, showSnackbarDeleteFolderSuccess: showSnackbarType}>(),
    deleteFolderSuccess: props<{id: number}>(),
    deleteFolderFailed: props<{ error: any }>(),
  },
});
