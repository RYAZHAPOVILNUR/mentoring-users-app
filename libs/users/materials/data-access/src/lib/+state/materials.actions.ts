import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.interface';
import { Material } from '../models/material.interface';

export const folderActions = createActionGroup({
  source: 'folder',
  events: {
    LoadFolders: emptyProps(),
    LoadFoldersSuccess: props<{ folders: Folder[] }>(),
    LoadFoldersFailure: props<{ error: unknown }>(),

    CreateFolder: props<{ title: string }>(),
    CreateFolderSuccess: props<{ folder: Folder }>(),
    CreateFolderFailure: props<{ error: unknown }>(),

    RemoveFolder: props<{ folderId: number }>(),
    RemoveFolderSuccess: props<{ folderId: number }>(),
    RemoveFolderFailure: props<{ error: unknown }>(),
  },
});

export const materialActions = createActionGroup({
  source: 'material',
  events: {
    LoadMaterials: emptyProps(),
    LoadMaterialsSuccess: props<{ materials: Material[] }>(),
    LoadMaterialsFailure: props<{ error: unknown }>(),
  },
});

export const additionalActions = createActionGroup({
  source: 'additional',
  events: {
    ClearMaterials: emptyProps(),
  },
});
