import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddFolder } from '../models/add-folder.model';
import { IFolder } from '../models/folder.model';
import { IMaterial } from '../models/material.model';
import { IAddMaterial } from '../models/add-material.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    addFolder: props<{ folder: IAddFolder }>(),
    addFolderSuccess: props<{ folder: IFolder }>(),
    addFolderFailure: props<{ error: any }>(),

    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: IFolder[] }>(),
    loadFoldersFailure: props<{ error: any }>(),

    deleteFolders: props<{ id: number }>(),
    deleteFoldersSuccess: props<{ id: number }>(),
    deleteFoldersFailure: props<{ error: any }>(),

    openFolder: emptyProps(),
    openFolderSuccess: props<{ folder: IFolder }>(),
    openFolderFailure: props<{ error: any }>(),

    addMaterials: props<{ material: IAddMaterial }>(),
    addMaterialsSuccess: props<{ material: IMaterial }>(),
    addMaterialsFailure: props<{ error: any }>(),

    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ material: IMaterial[] }>(),
    loadMaterialsFailure: props<{ error: any }>(),

    deleteMaterials: props<{ id: number }>(),
    deleteMaterialsSuccess: props<{ id: number }>(),
    deleteMaterialsFailure: props<{ error: any }>(),
  },
});
