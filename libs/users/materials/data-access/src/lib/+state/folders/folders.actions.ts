import { createActionGroup, props,createAction,emptyProps, } from '@ngrx/store';
import { IAddFolder } from '../../models/folders/folders-add.model';
import { IFolder } from '../../models/folders/folders.models';
import { FoldersErrors } from './folders.reducer';


// export const FoldersActions = createActionGroup({
//   source: 'Folder',

//   events: {
//     'Add Folder': props<{ folder: IAddFolder}>(),
//     'Init Folders': emptyProps(),
//   }
// });
export const initFolders = createAction('[Folder] Init');

export const loadFoldersSuccess = createAction(
  '[Materials Folder] Load All Folders Success',
  props<{ folders: IFolder[] }>()
);
export const loadFoldersFailed = createAction(
  '[Materials Folder] Load All Folders Failed',
  props<{ error: FoldersErrors | null }>()
);

export const addFolder = createAction('[Materials Folder] Add Folder', props<{ folder: IAddFolder }>());


export const addFolderSuccess = createAction('[Materials Folder] Add Folder Success', props<{ folder: IFolder }>());
export const addFolderFailed = createAction(
  '[Materials Folder] Add Folder Failed',
  props<{ error: FoldersErrors | null }>()
);

export const loadFolder = createAction('[Materials Folder] Load Folder');
export const loadFolderSuccess = createAction('[Materials Folder] Load Folder Success', props<{ folder: IFolder }>());
export const loadFolderFailed = createAction(
  '[Materials Folder] Load Folder Failed',
  props<{ error: FoldersErrors | null }>()
);