import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.model';
import { FolderAdd } from '../models/folder-add.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials Page',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ data: unknown }>(),
    'Load Materials Failure': props<{ error: unknown }>(),
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{ error: unknown }>(),
    'Add Folder': props<{ folder: FolderAdd }>(),
    'Add Folder Success': props<{ folder: Folder }>(),
    'Add Folder Failure': props<{ error: unknown }>(),
  },
});
