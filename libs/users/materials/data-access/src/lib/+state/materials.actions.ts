import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';

export type onSuccessSnackbarType = () => void;

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),
    initMaterialsSuccess: props<{folders: Folder[]}>(),
    initMaterialsFailure: emptyProps(),
    loadAllFolders: emptyProps(),
    loadFoldersFailure: props<{ error: any }>(),
    addFolder: props<{newFolderData: AddFolder; onSuccessSnackbar: onSuccessSnackbarType}>(),
    addFolderSuccess: props<{newFolder: Folder}>(),
    deleteFolder: props<{id: number}>(),
    deleteFolderSuccess: props<{id: number}>(),
    deleteFolderFailed: props<{ error: any }>(),
  },
});
