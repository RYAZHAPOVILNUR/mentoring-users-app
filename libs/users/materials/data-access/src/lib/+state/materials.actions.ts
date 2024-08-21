import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { AddFolder } from '../models/add-folder.model';
import { showSnackbarType } from '../models/show-snackbar-type.model';
import { MaterialVM } from '../models/material.model';
import { AddNewMaterial } from '../models/add-new-material.model';
import { MaterialDTO } from '@users/core/data-access';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),
    initMaterialsSuccess: props<{ folders: Folder[] }>(),
    initMaterialsFailure: props<{ error: any }>(),
    loadFolder: emptyProps(),
    loadFolderSuccess: props<{ folder: Folder }>(),
    loadFolderFailure: props<{ error: any }>(),
    // loadAllFolders: emptyProps(),
    loadFoldersFailure: props<{ error: any }>(),
    addFolder: props<{ folderData: AddFolder; showSnackbarAddFolderSuccess: showSnackbarType }>(),
    addFolderSuccess: props<{ newFolder: Folder }>(),
    deleteFolder: props<{ id: number; showSnackbarDeleteFolderSuccess: showSnackbarType }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailure: props<{ error: any }>(),
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialVM[] }>(),
    loadMaterialsFailure: props<{ error: any }>(),
    addMaterial: props<{ material: AddNewMaterial }>(),
    addMaterialSuccess: props<{ material: MaterialVM }>(),
    addMaterialFailure: emptyProps(),
    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailure: props<{ error: any }>(),
  },
});
