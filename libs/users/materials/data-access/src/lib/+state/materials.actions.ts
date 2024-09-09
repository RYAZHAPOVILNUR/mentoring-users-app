import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ data: unknown }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),

    'Add Folder': props<{ folder: Folder }>(),
    'Add Folder Success': props<{ folderData: Folder }>(),
    'Add Folder Failed': props<{  error: any  }>(),
  },
});
// export const addFolder = createAction('[Materials Page] Add Folder', props<{ folderData: CreateFolder }>());
// export const addFolderSuccess = createAction('[Materials Page] Add Folder', props<{ folderData: Folder[] }>());
// export const addFolderFailed = createAction('[Materials Page] Add Folder', props<{ error: any }>());
