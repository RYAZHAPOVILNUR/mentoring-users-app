import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ data: unknown }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),
  },
});

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folder': props<{folder: Folder}>(),
    'Load Folder Success': props<{folder: Folder}>(),
    'Load Folder Failure': props<{error: unknown}>(),

    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: Folder[]}>(),
    'Load Folders Failure': props<{error: unknown}>(),
  }
})