import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';
import { CreateMaterial } from '../models/create-material.model';

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

    currentFolder: emptyProps(),
    currentFolderSuccess: props<{ folder: Folder }>(),
    currentFolderFailure: props<{ error: Error }>(),

    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailure: props<{ error: Error }>(),

    addMaterial: props<{ material: CreateMaterial }>(),
    addMaterialSuccess: props<{ material: Material }>(),
    addMaterialFailure: props<{ error: Error }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailure: props<{ error: Error }>(),
  },
});
