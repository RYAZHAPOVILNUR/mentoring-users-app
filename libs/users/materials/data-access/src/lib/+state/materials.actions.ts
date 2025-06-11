import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolder, CreateMaterial, Folder, Material } from '../models/materials.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    // folders actions  
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),

    addFolder: props<{ folder: CreateFolder }>(),
    addFolderSuccess: props<{ newFolder: Folder }>(),

    getFolderForRead: emptyProps(),
    getFolderForReadSucces: props<{ folder: Folder }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),

    loadFoldersFailure: props<{ error: string}>(),

    // materials actions 
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),

    addMaterial: props<{ material: CreateMaterial }>(),
    addMaterialSuccess: props<{ newMaterial: Material }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
  },
});
