import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder, Material } from '../model/materials.model';
import { CreateFolder } from '../model/create-folder.model';
import { CreateMaterial } from '../model/create-material.model';

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

    // materials====================================================
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),

    addMaterial: props<{ material: CreateMaterial }>(),
    addMaterialSuccess: props<{ newMaterial: Material }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
  },
});
