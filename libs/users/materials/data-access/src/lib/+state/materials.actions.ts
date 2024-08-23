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
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailure: props<{ error: any }>(),

    // туду удалить, т. к. не использую в итоге
    loadFolder: emptyProps(),
    loadFolderSuccess: props<{ folder: Folder }>(),
    loadFolderFailure: props<{ error: any }>(),

    addFolder: props<{ folderData: AddFolder; showSnackbarAddFolderSuccess: showSnackbarType }>(),
    addFolderSuccess: props<{ newFolder: Folder }>(),
    addFolderFailure: props<{ error: any }>(),

    deleteFolder: props<{ id: number; showSnackbarDeleteFolderSuccess: showSnackbarType }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailure: props<{ error: any }>(),

    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialVM[] }>(),
    loadMaterialsFailure: props<{ error: any }>(),

    addMaterial: props<{ material: AddNewMaterial }>(),
    addMaterialSuccess: props<{ material: MaterialVM }>(),
    addMaterialFailure: props<{ error: any }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailure: props<{ error: any }>(),
  },
});
