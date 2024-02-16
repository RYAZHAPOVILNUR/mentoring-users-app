import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsEntity } from './materials.models';
import { Folder } from '../models/folder.model';


export const foldersActions = createActionGroup({
  source: 'Materials Page',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailed: props<{ error: Error }>()
  }
});

// export const initMaterials = createAction('[Materials Page] Init');
//
// export const loadMaterialsSuccess = createAction(
//   '[Materials/API] Load Materials Success',
//   props<{ materials: MaterialsEntity[] }>()
// );
//
// export const loadMaterialsFailure = createAction(
//   '[Materials/API] Load Materials Failure',
//   props<{ error: any }>()
// );
