import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';
import { MaterialCreate } from '../models/material-create.model';


export const foldersActions = createActionGroup({
  source: 'Materials Page',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailed: props<{ error: Error }>(),

    createFolder: props<{ title: string }>(),
    createFolderSuccess: props<{ folder: Folder }>(),
    createFolderFailed: props<{ error: Error }>(),

    removeFolder: props<{ id: number }>(),
    removeFolderSuccess: emptyProps(),
    removeFolderFailed: props<{ error: Error }>(),

    loadCurrentFolder:emptyProps(),
    loadCurrentFolderSuccess: props<{ folder: Folder }>(),
    loadCurrentFolderFailed: props<{ error: Error }>(),
  }
});

export const materialsActions = createActionGroup({
  source: 'Materials Page',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailed: props<{ error: Error }>(),

    addMaterial: props<{ material: MaterialCreate }>(),
    addMaterialSuccess: props<{ material: Material }>(),
    addMaterialFailed: props<{ error: Error }>(),

    removeMaterial: props<{ materialId: number }>(),
    removeMaterialSuccess: emptyProps(),
    removeMaterialFailed: props<{ error: Error }>()
  }
})
