import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolder } from '../models/create-folder.model';
import { Folder } from '../models/folder.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ data: unknown }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),

    'Add Folder': props<{ folderData: CreateFolder }>(),
    'Add Folder Success': props<{ folderData: Folder }>(),
    'Add Folder Failed': props<{  error: any  }>(),
  },
});
