import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from '../../models/folders-entity';
import { LoadingStatus } from '@users/core/data-access';

// export const FoldersActions = createActionGroup({
//   source: 'Folders',
//   events: {
//     'Load Folders': emptyProps(),
//     'Load Folders Success': props<{ data: unknown }>(),
//     'Load Folders Failure': props<{ error: unknown }>(),
//   },
// });

export const initFolders = createAction('[Folders Page] Init');

export const loadfolders = createAction('[Folder Page] Load Folder');

export const loadFoldersSuccess = createAction(
  '[Folders/Api] Load Folder Success',
  props<{ folders: FoldersEntity[] }>()
);

export const loadFolderFailure = createAction('[Folder/Api] Load Folder Failure', props<{ error: any }>());

export const loadFolderFailed = createAction('[Folders/Api] Load Folder Failed', props<{ error: any }>());

export const updateFolderStatus = createAction(
  '[Folders Detail] Update Folder Status',
  props<{ status: LoadingStatus }>()
);
